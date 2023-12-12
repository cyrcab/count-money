import { Response } from 'express'
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

interface Error {
  status?: number
  message?: string
}

export const errorHandler = (err: Error, _, res: Response) => {
  if (err instanceof PrismaClientValidationError) {
    return res.status(400).json({ message: 'Bad request' })
  }
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(400).json({ message: 'This entity already exist.' })
      case 'P2025':
        return res.status(404).json({ message: 'Not found' })
      default:
        return res.status(500).json({ message: 'Internal serveur error.' })
    }
  } else {
    return res.status(500).json({ message: 'Internal serveur error.' })
  }
}
