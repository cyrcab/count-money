// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {addArticle, getArticleController} from "../controllers/articles/article.controller";
import {cookieMiddleware} from "../middleware/cookie.middleware";

router.post('/', [cookieMiddleware], addArticle)
router.get('/', [cookieMiddleware], getArticleController)

export default router