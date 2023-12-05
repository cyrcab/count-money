import { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import Parser from "rss-parser";
import cheerio from "cheerio";

const prisma = new PrismaClient();
const parser = new Parser();

export const rssreader = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    if (userId) {
      const userRSSFilters = await prisma.userRSS_filter.findMany({
        where: {
          userId: userId,
        },
      });

      const rssData = [];

      if (!userRSSFilters) {
        console.log(" ");
      }

      for (const filter of userRSSFilters) {
        const rssUrl = `https://coinacademy.fr/actu/${filter}?feed=gn`;
        const response = await axios.get(rssUrl);

        rssData.push(response.data);
      }

      res.json(rssData);
    } else {
      const rssData = [];
      const rssUrl = `https://coinacademy.fr/actu/gn`;
      const feed = await parser.parseURL(rssUrl);

      feed.items.forEach((item) => {
        const contentHtml = item["content:encoded"];

        const $ = cheerio.load(contentHtml);

        const imgSrc = $("figure img").attr("src");

        console.log(imgSrc);

        rssData.push({
          title: item.title,
          link: item.link,
          imgSrc: imgSrc || "No image",
        });
      });

      res.json(rssData);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des flux RSS" });
  }
};
