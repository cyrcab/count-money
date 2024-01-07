import { prisma } from '../libs/prisma'
import { RoleName } from '../entities/Roles'

export async function seedRoles() {
  await prisma.role.create({
    data: {
      name: RoleName.ADMIN,
    },
  })
  await prisma.role.create({
    data: {
      name: RoleName.USER,
    },
  })
}
