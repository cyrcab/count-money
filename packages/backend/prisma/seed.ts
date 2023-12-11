import { PrismaClient } from '@prisma/client'
import { generatePwd } from '../controllers/utils/Pwd'
import { seedRoles } from './seedRole'
const prisma = new PrismaClient()
async function main() {
  await prisma.$executeRaw`SET foreign_key_checks = 0;`
  await prisma.$executeRaw`TRUNCATE TABLE User;`
  await prisma.$executeRaw`TRUNCATE TABLE Role;`
  await prisma.$executeRaw`SET foreign_key_checks = 1;`

  await seedRoles()

  await prisma.user.create({
    data: {
      email: 'ribcoco@gmail.com',
      firstname: 'Ricardo',
      lastname: 'Coco',
      password: await generatePwd('MDP'),
      role: {
        connect: {
          name: 'user',
        },
      },
    },
  })

  await prisma.user.create({
    data: {
      email: 'ribcoco2@gmail.com',
      firstname: 'Rib',
      lastname: 'Coco2',
      password: await generatePwd('MDP'),
      role: {
        connect: {
          name: 'admin',
        },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
