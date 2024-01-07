import { Request, Response } from "express";
import {addNewArticle} from "./addArticle";
import {getArticles} from "./getArticle";
import { getArticleUser } from "./getArticleUser";
import { deleteArticleUser } from "./deleteArticleUser";
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

export const getArticleUserController = async (req: Partial<AuthenticatedRequest>, res: Partial<Response>) => {
    const result = await getArticleUser(req.body.user.id)
    return res.status(result.status).json(result.body);
}

export const deleteArticleUserController = async (req: Partial<AuthenticatedRequest>, res: Partial<Response>) => {
    const idArticle = req.params.idArticle
    const result = await deleteArticleUser(req.body.user.id, idArticle)
    return res.status(result.status).json(result.body);
}