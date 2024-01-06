// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { cookieMiddleware } from '../middleware/cookie.middleware'
import {
  getMe,
  getAllUser,
  updateUserController,
  deleteUserController,
} from '../controllers/user/user.controller'
import { verifyAdmin, verifyAdminOrMe } from '../middleware/token.middleware'

router.get('/me', [cookieMiddleware], getMe)
router.get('/', verifyAdmin, getAllUser)
router.patch('/:id', verifyAdminOrMe, updateUserController)
router.delete('/:id', verifyAdminOrMe, deleteUserController)

export default router
