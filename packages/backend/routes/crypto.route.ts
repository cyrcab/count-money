import { Router } from 'express'
import {
  createCrypto,
  deleteCrypto,
  getAllCrypto,
  getOneCrypto,
  updateCrypto,
} from '../controllers/crypto/crypto.controller'
import { callToBinance } from '../controllers/binanceApi/binance.controller'
import { cookieMiddleware } from '../middleware/cookie.middleware'
import { roleGuardMiddleware } from '../middleware/roleGuard.middleware'
import { RoleName } from '../entities/Roles'

const router = Router()

router.post('/', [cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN])], createCrypto)
router.get('/', getAllCrypto)
router.get('/external', callToBinance)
router.get('/:id', getOneCrypto)
router.put('/:id', [cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN])], updateCrypto)
router.delete('/:id', [cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN])], deleteCrypto)

export default router
