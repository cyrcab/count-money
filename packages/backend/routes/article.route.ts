// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { roleGuardMiddleware } from "../middleware/roleGuard.middleware";
import {addArticle, getArticleController, getArticleUserController, deleteArticleUserController} from "../controllers/articles/article.controller";
import {cookieMiddleware} from "../middleware/cookie.middleware";
import { RoleName } from "../entities/Roles";

router.post('/', [cookieMiddleware], addArticle)
router.get('/', [cookieMiddleware], getArticleController)
router.get('/user', [cookieMiddleware], getArticleUserController)
router.delete('/:idArticle', [cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN, RoleName.USER])], deleteArticleUserController)


export default router