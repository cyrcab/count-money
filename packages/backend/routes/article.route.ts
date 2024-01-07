// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {addArticle, getArticleController, getArticleUserController, deleteArticleUserController} from "../controllers/articles/article.controller";
import {cookieMiddleware} from "../middleware/cookie.middleware";

router.post('/', [cookieMiddleware], addArticle)
router.get('/', [cookieMiddleware], getArticleController)
router.get('/user', [cookieMiddleware], getArticleUserController)
router.delete('/:idArticle', [cookieMiddleware], deleteArticleUserController)


export default router