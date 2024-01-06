import { Request, Response, NextFunction } from 'express'
import { verifyToken, decodeToken, generateToken } from '../controllers/utils/Token'
import { checkRefreshToken, getRefreshTokenForUser } from '../controllers/utils/refreshToken'

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
