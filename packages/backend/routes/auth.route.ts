// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { register, login, logout } from '../controllers/auth/auth.controller'


router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)

export default router
