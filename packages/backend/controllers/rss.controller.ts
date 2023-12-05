
import { Request, Response } from 'express';
import axios from 'axios';

export const rssreader = async (req: Request, res: Response) => {
    try {
        const rssUrl = 'https://coinacademy.fr/actu/gn';
        const response = await axios.get(rssUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du flux RSS' });
    }
}