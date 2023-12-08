// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { getMe, getAllUser, updateUserController } from "../controllers/user/user.controller";
import {verifyUser, verifyAdmin, verifyAdminOrMe} from "../middleware/token.middleware";

router.get('/me', verifyUser, getMe)
router.get('/', verifyAdmin, getAllUser)
router.patch('/:id', verifyAdminOrMe, updateUserController)

export default router
