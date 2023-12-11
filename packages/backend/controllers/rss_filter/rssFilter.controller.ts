import { Request, Response } from "express";
import {addNewRssFilter} from './addRssFilter'
import {getRssFilter, ParamRequest} from './getRssFilter'

export async function addRssFilter(req: Request, res: Response) {
    const result = await addNewRssFilter(req.body)
    return res.status(result.status).json(result.body);
}

export async function getRssFilterController(req: ParamRequest, res: Response) {
    const result = await getRssFilter(req)
    return res.status(result.status).json(result.body);
}