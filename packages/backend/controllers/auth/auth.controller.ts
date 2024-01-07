import { Request, Response } from 'express'
import { registerUser } from './register'
import { loginUser } from './login'
import { decodeToken, generateToken } from '../utils/Token'
import { prisma } from '../../libs/prisma'
import { createOrUpdateRefreshToken } from '../utils/refreshToken'
import axios from 'axios'
import { errorHandler } from '../../middleware/errors.middleware'

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
    if (user.isOauth) {
      return res.status(200).clearCookie('auth').json({ msg: 'Vous êtes déconnecté' })
    }
    await prisma.refreshToken.delete({
      where: {
        userId: user.id,
      },
    })
    return res.status(200).clearCookie('auth').json({ msg: 'Vous êtes déconnecté' })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' })
  }
}

export async function googleSignIn(req: Request, res: Response) {
  try {
    const code = req.body.code

    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code: code,
      client_id: '39117436981-anag4bcvqh8fc4ausd5j4ae5s61keuvi.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'http://localhost:5173',
      grant_type: 'authorization_code',
    })
    const { access_token } = response.data

    const userInfos = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const result = await prisma.user.create({
      data: {
        email: userInfos.data.email,
        firstname: userInfos.data.given_name,
        lastname: userInfos.data.family_name,
        password: '',
        isOauth: true,
      },
    })

    const user = {
      id: result.id,
      email: result.email,
      firstname: result.firstname,
      lastname: result.lastname,
      roleId: result.roleId,
      isOauth: result.isOauth,
    }

    const refreshTokenInDb = await createOrUpdateRefreshToken(user, access_token)

    if (!refreshTokenInDb) {
      return res.status(500).json({ msg: 'Internal server error' })
    }

    // generate token for cookie
    const cookieToken = generateToken(user, '1h')

    return res
      .status(200)
      .cookie('auth', cookieToken, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .json({ user: user })
  } catch (error) {
    errorHandler(error, req, res)
  }
}

export async function googleLogin(req: Request, res: Response) {
  try {
    const code = req.body.code

    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code: code,
      client_id: '39117436981-anag4bcvqh8fc4ausd5j4ae5s61keuvi.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'http://localhost:5173',
      grant_type: 'authorization_code',
    })
    const { access_token } = response.data

    const userInfos = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const result = await prisma.user.findUnique({
      where: {
        email: userInfos.data.email,
      },
    })

    if (!result) {
      return res.status(404).json({ msg: 'User not found' })
    }

    const user = {
      id: result.id,
      email: result.email,
      firstname: result.firstname,
      lastname: result.lastname,
      roleId: result.roleId,
      isOauth: result.isOauth,
    }

    // generate token for cookie
    const cookieToken = generateToken(user, '1h')

    return res
      .status(200)
      .cookie('auth', cookieToken, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .json({ user: user })
  } catch (error) {
    errorHandler(error, req, res)
  }
}
