// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { getMe, getAllUser } from "../controllers/user/user.controller";
import {verifyUser, verifyAdmin} from "../middleware/token.middleware";

router.get('/me', verifyUser, getMe)
router.get('/', verifyAdmin, getAllUser)

export default router
