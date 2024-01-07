import { Request, Response } from "express";
import {addNewArticle} from "./addArticle";
import {getArticles} from "./getArticle";
interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const addArticle = async (req: Partial<AuthenticatedRequest>, res: Partial<Response>) => {
    const result = await addNewArticle(req.body.data, req.body.user.id)
    return res.status(result.status).json(result.body);
};

export const getArticleController = async (req: Partial<AuthenticatedRequest>, res: Partial<Response>) => {
    const result = await getArticles(req.body)
    return res.status(result.status).json(result.body);
}