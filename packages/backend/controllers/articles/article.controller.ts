import { Request, Response } from "express";
import {addNewArticle} from "./addArticle";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const addArticle = async (req: Partial<AuthenticatedRequest>, res: Partial<Response>) => {
    console.log(req.userId)
    const result = await addNewArticle(req.body, req.userId)
    return res.status(result.status).json(result.body);
};