// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {addArticle} from "../controllers/articles/article.controller";
import {verifyUser} from "../middleware/token.middleware";

router.post('/', verifyUser, addArticle)

export default router