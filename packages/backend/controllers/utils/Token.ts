import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

// function to generate token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateToken(user: Partial<User>, expireDate: number | string) {
  return jwt.sign(
    { id: user.id, email: user.email, roleId: user.roleId, isOauth: user.isOauth },
    process.env.JWT_SECRET,
    {
      expiresIn: expireDate,
    }
  )
}

export function decodeToken(token: string) {
  return jwt.decode(token)
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return false
    return decoded
  })
}
