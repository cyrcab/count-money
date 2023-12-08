// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { getMe } from "../controllers/user/user.controller";
import {verifyUser} from "../middleware/token.middleware";

router.get('/me', verifyUser, getMe)

export default router
