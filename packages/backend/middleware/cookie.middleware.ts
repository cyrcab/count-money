import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../controllers/utils/Token'

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['auth'] // Remplacez 'nomDuCookieJWT' par le nom de votre cookie

  if (!token) {
    return res.status(401).send('Token not found in cookies')
  }

  // Vérifier et décoder le JWT
  try {
    const decoded = verifyToken(token)
    // Stocker les données décodées dans l'objet de requête
    req.body = decoded
    next()
  } catch (err) {
    // Gérer les erreurs de vérification du token (comme l'expiration)
    return res.status(403).send('Invalid or expired token')
  }
}
