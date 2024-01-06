import { Request, Response } from 'express'
import { registerUser } from './register'
import { loginUser } from './login'
import { decodeToken, generateToken } from '../utils/Token'
import { prisma } from '../../libs/prisma'
import { createOrUpdateRefreshToken } from '../utils/refreshToken'

// function to register user
export async function register(req: Request, res: Response) {
  const result = await registerUser(req.body)

  if (result.status !== 201) {
    return res.status(result.status).json(result.body)
  }

  // create refresh token and link it to user
  const refreshTokenInDb = await createOrUpdateRefreshToken(result.body.user)

  if (!refreshTokenInDb) {
    return res.status(500).json({ msg: 'Internal server error' })
  }

  // generate token for cookie
  const cookieToken = generateToken(result.body.user, '1h')

  return res
    .status(result.status)
    .cookie('auth', cookieToken, {
      httpOnly: true,
      sameSite: 'lax',
    })
    .json(result.body)
}

// function to login user
export async function login(req: Request, res: Response) {
  const result = await loginUser(req.body)

  // if error return error and delete cookie
  if (result.status !== 200) {
    return res.status(result.status).clearCookie('auth').json(result.body)
  }

  const userToken = await createOrUpdateRefreshToken(result.body.user)

  if (!userToken) {
    return res.status(500).json({ msg: 'Internal server error' })
  }

  const cookieToken = generateToken(result.body.user, '1h')

  return res
    .status(result.status)
    .cookie('auth', cookieToken, {
      httpOnly: true,
      sameSite: 'lax',
    })
    .json({ user: result.body.user })
}

// function to logout user

export async function logout(req: Request, res: Response) {
  const token = req.cookies['auth']

  const user = decodeToken(token)
  if (!user) {
    return res.status(403).json({ msg: 'You are not allowed to access this resource' })
  }

  try {
    await prisma.refreshToken.delete({
      where: {
        userId: user.id,
      },
    })
    return res.status(200).clearCookie('auth').json({ msg: 'Vous êtes déconnecté' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Internal server error' })
  }
}
