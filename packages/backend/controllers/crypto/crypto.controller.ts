import { Request, Response } from 'express'
import { prisma } from '../../libs/prisma'
import { Crypto } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

export async function createCrypto(req: Request, res: Response) {
  try {
    const result: Crypto = await prisma.crypto.create({
      data: req.body,
    })
    return res.status(201).json(result)
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: 'Bad request' })
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Crypto already exists' })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getAllCrypto(req: Request, res: Response) {
  try {
    const result: Crypto[] = await prisma.crypto.findMany()
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
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
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateCrypto(req: Request, res: Response) {
  try {
    const result: Crypto | undefined = await prisma.crypto.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: 'Bad request' })
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Crypto already exists' })
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Crypto does not exist' })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteCrypto(req: Request, res: Response) {
  try {
    const result: Crypto | undefined = await prisma.crypto.delete({
      where: { id: Number(req.params.id) },
    })
    return res.status(200).json(result)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Crypto does not exist' })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}