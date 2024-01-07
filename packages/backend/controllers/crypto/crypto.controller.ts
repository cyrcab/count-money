import { Request, Response } from 'express'
import { prisma } from '../../libs/prisma'
import { Crypto } from '@prisma/client'
import { errorHandler } from '../../middleware/errors.middleware'
import { addFavoriteCrypto } from './AddFavCrypto'
import { getFavCrypto } from './GetFavCrypto'
import {deleteCrypUser} from './DeleteCryptoToUser'

export async function createCrypto(req: Request, res: Response) {
  try {
    const cryptoToCreate = req.body.data
    const result: Crypto = await prisma.crypto.create({
      data: cryptoToCreate,
    })
    return res.status(201).json(result)
  } catch (error) {
    errorHandler(error, req, res)
  }
}

export async function getAllCrypto(req: Request, res: Response) {
  try {
    const result: Crypto[] = await prisma.crypto.findMany()
    return res.status(200).json(result)
  } catch (error) {
    errorHandler(error, req, res)
  }
}

export async function getOneCrypto(req: Request, res: Response) {
  try {
    const result: Crypto | undefined = await prisma.crypto.findUnique({
      where: { id: Number(req.params.id) },
    })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    errorHandler(error, req, res)
  }
}

export async function updateCrypto(req: Request, res: Response) {
  try {
    const dataToUpdate = req.body.data
    const result: Crypto | undefined = await prisma.crypto.update({
      where: { id: Number(req.params.id) },
      data: dataToUpdate,
    })
    return res.status(200).json(result)
  } catch (error) {
    errorHandler(error, req, res)
  }
}

export async function deleteCrypto(req: Request, res: Response) {
  try {
    const result: Crypto | undefined = await prisma.crypto.delete({
      where: { id: Number(req.params.id) },
    })
    return res.status(200).json(result)
  } catch (error) {
    errorHandler(error, req, res)
  }
}

export async function addFavoriteCryptoController(req: Request, res: Response) {
  const idUser = req.params.id
  const idCrypto = req.params.idCrypto

  const result = await addFavoriteCrypto(parseInt(idUser,10), parseInt(idCrypto,10))
  return res.status(result.status).json(result.body);
}

export async function getFavCryptoController(req: Request, res: Response) {
  const idUser = req.body.user.id

  const result = await getFavCrypto(parseInt(idUser,10))
  return res.status(result.status).json(result.body);
}

export async function deleteCryptoToUserController(req: Request, res: Response) {
  const idUser = req.params.id
  const idCrypto = req.params.idCrypto

  const result = await deleteCrypUser(parseInt(idUser,10), parseInt(idCrypto,10))
  return res.status(result.status).json(result.body);
}