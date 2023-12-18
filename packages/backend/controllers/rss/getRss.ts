import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import Parser from "rss-parser";
import cheerio from "cheerio";

const prisma = new PrismaClient();
const parser = new Parser();

export async function getRssReader(req: Partial<Request>) {
  try {
    const userId = req.body.userId;
    let feed;
    const rssData = [];

    if (userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return { status: 404, body: { msg: "Utilisateur introuvable" } };
      }

      const userRSSFilters = await prisma.userRSS_filter.findMany({
        where: {
          userId: userId,
        },
        include: {
          RSS_filter: true,
        },
      });

      if (!userRSSFilters) {
        const rssUrl = `https://coinjournal.net/fr/actualites/feed/`;
        feed = await parser.parseURL(rssUrl);
      } else {
            for (const filter of userRSSFilters) {
                const rssUrl = `https://coinjournal.net/fr/actualites${filter.RSS_filter.url}`;
                feed = await parser.parseURL(rssUrl);

                feed.items.forEach((item) => {
                    // Accessing the HTML content
                    const contentHtml = item['content:encoded'];
            
                    // Using cheerio to parse HTML content
                    const $ = cheerio.load(contentHtml);
            
                    // Find the image element and get its source (src) attribute using the media namespace
                    const imgSrc = $('img').attr('src');
            
                    // Log the image source
            
                    // Pushing title and image URL to rssData array
                    rssData.push({
                    title: item.title,
                    link: item.link,
                    imgSrc: imgSrc || 'No image',
                    });
                });
            }
            return { status: 200, body: {rssData, msg: 'Flux recupéré' } };
        }
    } else {
      const rssUrl = `https://coinjournal.net/fr/actualites/feed/`;
      feed = await parser.parseURL(rssUrl);

      feed.items.forEach((item) => {
        // Accessing the HTML content
        const contentHtml = item['content:encoded'];

        // Using cheerio to parse HTML content
        const $ = cheerio.load(contentHtml);

        // Find the image element and get its source (src) attribute using the media namespace
        const imgSrc = $('img').attr('src');


        // Pushing title and image URL to rssData array
        rssData.push({
          title: item.title,
          link: item.link,
          imgSrc: imgSrc || 'No image',
        });
      });

        return { status: 200, body: {rssData, msg: 'Flux recupéré' }};
    }
  } catch (error) {
    console.error(error);
    return { status: 500, body: { msg: "Erreur serveur" } };
  }
}
