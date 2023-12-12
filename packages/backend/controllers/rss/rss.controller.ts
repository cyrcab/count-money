import { Request, Response } from "express";
import {getRssReader} from './getRss'

export const rssreader = async (req: Partial<Request>, res: Partial<Response>) => {
    const result = await getRssReader(req)
    return res.status(result.status).json(result.body);
};
