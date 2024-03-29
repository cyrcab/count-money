import { User } from '@prisma/client'
import { prisma } from '../../libs/prisma'
import { verifyToken, generateToken } from './Token'

export const checkRefreshToken = async (refreshToken: string) => await verifyToken(refreshToken)

export const getRefreshTokenForUser = async (userId: number) => {
  const tokenRecord = await prisma.refreshToken.findFirst({ where: { userId } })
  return tokenRecord ? tokenRecord.token : false
}

export const createOrUpdateRefreshToken = async (user: Partial<User>, googleToken?: string) => {
  try {
    const dataForToken = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      roleId: user.roleId,
    }
    const refreshToken = !user.isOauth ? await generateToken(dataForToken, '1y') : googleToken

    await prisma.refreshToken.upsert({
      where: { userId: user.id },
      update: { token: refreshToken },
      create: { userId: user.id, token: refreshToken },
    })

    return refreshToken
  } catch (error) {
    console.log(error)
    return false
  }
}
