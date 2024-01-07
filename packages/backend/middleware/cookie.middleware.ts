import { Request, Response, NextFunction } from 'express'
import { verifyToken, decodeToken, generateToken } from '../controllers/utils/Token'
import { checkRefreshToken, getRefreshTokenForUser } from '../controllers/utils/refreshToken'
import axios from 'axios'
import { prisma } from '../libs/prisma'

export const cookieMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.cookies['auth']

  if (!authToken) {
    return res.sendStatus(403)
  }

  // Vérifier et décoder le JWT
  try {
    const isValid = verifyToken(authToken)
    if (isValid) {
      req.body = {
        user: isValid,
        data: req.body,
      }
      next()
      return
    }
    const decoded = decodeToken(authToken)

    const userToken = await getRefreshTokenForUser(decoded.id)
    if (!userToken) {
      return res.status(401).clearCookie('auth').json({ msg: 'Veuillez vous reconnecter' })
    }

    if (decoded.isOauth && userToken) {
      const userInfos = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      const result = await prisma.user.findUnique({
        where: {
          email: userInfos.data.email,
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

      // generate token for cookie
      const cookieToken = generateToken(user, '1h')

      res.cookie('auth', cookieToken, {
        httpOnly: true,
        sameSite: 'lax',
      })
      req.body = {
        user: decoded,
        data: req.body,
      }
      next()
      return
    }

    const refreshTokenIsValid = await checkRefreshToken(userToken)

    if (!refreshTokenIsValid) {
      return res.status(401).clearCookie('auth').json({ msg: 'Veuillez vous reconnecter' })
    }

    const cookieToken = generateToken(decoded, '1h')

    res.cookie('auth', cookieToken, {
      httpOnly: true,
      sameSite: 'lax',
    })
    req.body = {
      user: decoded,
      data: req.body,
    }
    next()
  } catch (err) {
    return res.status(401).json({ msg: 'Veuillez vous reconnecter' })
  }
}
