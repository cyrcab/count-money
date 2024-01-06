import { Request, Response, NextFunction } from 'express'
import { prisma } from '../libs/prisma'
import { RoleName } from '../entities/Roles'


export const roleGuardMiddleware = (roles: RoleName[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { roleId } = req.body.user
    const role = await prisma.role.findUnique({ where: { id: roleId } })

    if (!roles.some((r) => r === role?.name)) {
      return res.status(403).json({ msg: 'You are not allowed to access this resource' })
    }
    return next()
  }
}
