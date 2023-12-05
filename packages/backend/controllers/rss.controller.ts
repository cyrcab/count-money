import { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        const rssUrl = `https://coinacademy.fr/actu/gn`;
        const response = await axios.get(rssUrl);
        return res.json(response.data);
      }
      for (const filter of userRSSFilters) {
        const rssUrl = `https://coinacademy.fr/actu/${filter}?feed=gn`;
        const response = await axios.get(rssUrl);

        rssData.push(response.data);
      }

      res.json(rssData);
    } else {
      const rssUrl = `https://coinacademy.fr/actu/gn`;
      const response = await axios.get(rssUrl);
      return res.json(response.data);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des flux RSS" });
  }
};
