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
      const rssUrl = `https://coinjournal.net/fr/actualites/feed/`;
      const feed = await parser.parseURL(rssUrl);

      feed.items.forEach((item) => {
        // Accessing the HTML content
        const contentHtml = item['content:encoded'];

        // Using cheerio to parse HTML content
        const $ = cheerio.load(contentHtml);

        // Find the image element and get its source (src) attribute using the media namespace
        const imgSrc = $('img').attr('src');
        rssData.push({
          title: item.title,
          link: item.link,
          imgSrc: imgSrc || 'No image',
        });
      });

      res.json(rssData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des flux RSS" });
  }
};
