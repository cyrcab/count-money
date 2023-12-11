import { prisma } from '../libs/prisma'

export async function seedRoles() {
  await prisma.role.create({
    data: {
      name: 'admin',
    },
  })
  await prisma.role.create({
    data: {
      name: 'user',
    },
  })
}
