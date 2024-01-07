// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { cookieMiddleware } from '../middleware/cookie.middleware'
import {
  getMe,
  getAllUser,
  updateUserController,
  deleteUserController,
} from '../controllers/user/user.controller'
import { roleGuardMiddleware } from '../middleware/roleGuard.middleware'
import { RoleName } from '../entities/Roles'

router.get('/me', [cookieMiddleware], getMe)
router.get('/', [cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN])], getAllUser)
router.patch('/:id', [cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN, RoleName.USER])], updateUserController)
router.delete('/:id', [cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN, RoleName.USER])], deleteUserController)

export default router
