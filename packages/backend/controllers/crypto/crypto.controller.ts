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
    return res.status(500).json({ message: 'Internal server error' })
  }
}
