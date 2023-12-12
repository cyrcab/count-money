import { Router } from 'express'
import {
  createCrypto,
  deleteCrypto,
  getAllCrypto,
  getOneCrypto,
  updateCrypto,
} from '../controllers/crypto/crypto.controller'

const router = Router()

router.post('/', createCrypto)
router.get('/', getAllCrypto)
router.get('/:id', getOneCrypto)
router.put('/:id', updateCrypto)
router.delete('/:id', deleteCrypto)

export default router
