import { Request, Response } from "express";
import {addNewRssFilter, addRssToUser} from './addRssFilter'
import {getRssFilter, ParamRequest, getRssFilters, getRssFiltersByUser} from './getRssFilter'
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

export async function addRssToUserController(req: Request, res: Response) {
    const idUser = req.params.id
    const idRss = req.params.idRss

    const result = await addRssToUser(parseInt(idUser,10), parseInt(idRss,10))
    return res.status(result.status).json(result.body);
}

export async function getRssFiltersByUserController(req: Request, res: Response) {
    const idUser = req.params.id

    const result = await getRssFiltersByUser(parseInt(idUser,10))
    return res.status(result.status).json(result.body);
}