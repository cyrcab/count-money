// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { register, login } from '../controllers/auth/auth.controller'


router.post('/register', register)
router.post('/login', login)

export default router
