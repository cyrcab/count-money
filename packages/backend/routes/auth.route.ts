// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {
  register,
  login,
  logout,
  googleSignIn,
  googleLogin,
} from '../controllers/auth/auth.controller'

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)
router.post('/google/register', googleSignIn)
router.post('/google/login', googleLogin)

export default router
