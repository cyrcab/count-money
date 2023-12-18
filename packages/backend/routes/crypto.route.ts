import { Router } from 'express'
import {
  createCrypto,
  deleteCrypto,
  getAllCrypto,
  getOneCrypto,
  updateCrypto,
} from '../controllers/crypto/crypto.controller'
import { callToBinance } from '../controllers/binanceApi/binance.controller'

const router = Router()

router.post('/', createCrypto)
router.get('/', getAllCrypto)
router.get('/external', callToBinance)
router.get('/:id', getOneCrypto)
router.put('/:id', updateCrypto)
router.delete('/:id', deleteCrypto)

export default router
