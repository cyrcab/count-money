import { Request, Response } from "express";
import {addNewRssFilter} from './addRssFilter'

export async function addRssFilter(req: Request, res: Response) {
    const result = await addNewRssFilter(req.body)
    return res.status(result.status).json(result.body);
}