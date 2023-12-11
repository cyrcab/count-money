import { Router } from 'express'
import { createCrypto } from '../controllers/crypto/crypto.controller'

const router = Router()

router.post('/', createCrypto)

export default router
