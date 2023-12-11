import { Request, Response } from "express";
import {addNewRssFilter} from './addRssFilter'
import {getRssFilter, ParamRequest, getRssFilters} from './getRssFilter'
import { updateRss } from "./updateRssFilter";
import { deleteRss } from "./deleteRssFilter";

export async function addRssFilter(req: Request, res: Response) {
    const result = await addNewRssFilter(req.body)
    return res.status(result.status).json(result.body);
}

export async function getRssFilterController(req: ParamRequest, res: Response) {
    const result = await getRssFilter(req)
    return res.status(result.status).json(result.body);
}

export async function getRssFiltersController(req: Request, res: Response) {
    const result = await getRssFilters()
    return res.status(result.status).json(result.body);
}

export async function updateRssFilterController(req: Request, res: Response) {
    const id = req.params.id

    const result = await updateRss(req.body, parseInt(id,10))
    return res.status(result.status).json(result.body);
}

export async function deleteRssFilterController(req: Request, res: Response) {
    const id = req.params.id

    const result = await deleteRss(parseInt(id,10))
    return res.status(result.status).json(result.body);
}