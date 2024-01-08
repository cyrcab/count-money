import { PrismaClient } from '@prisma/client'
import { generatePwd } from '../controllers/utils/Pwd'
import { seedRoles } from './seedRole'
import { seedRssFilter } from './seedRssFilter'
import { RoleName } from '../entities/Roles'
import { seedArticle } from './seedArticle'
import { seedCrypto } from './seedCrypto'
const prisma = new PrismaClient()
async function main() {
  await prisma.$executeRaw`SET foreign_key_checks = 0;`
  await prisma.$executeRaw`TRUNCATE TABLE User;`
  await prisma.$executeRaw`TRUNCATE TABLE Article;`
  await prisma.$executeRaw`TRUNCATE TABLE Crypto;`
  await prisma.$executeRaw`TRUNCATE TABLE Role;`
  await prisma.$executeRaw`TRUNCATE TABLE RSS_filter;`
  await prisma.$executeRaw`TRUNCATE TABLE UserRSS_filter;`
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
          name: RoleName.USER,
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
          name: RoleName.ADMIN,
        },
      },
    },
  })

  await prisma.user.create({
    data: {
      email: 'clem@clem.com',
      firstname: 'clement',
      lastname: 'mendes',
      password: await generatePwd('clem'),
      role: {
        connect: {
          name: RoleName.USER,
        },
      },
    },
  })

  await prisma.user.create({
    data: {
      email: 'alex@alex.com',
      firstname: 'alexandre',
      lastname: 'merigot',
      password: await generatePwd('alex'),
      role: {
        connect: {
          name: RoleName.USER,
        },
      },
    },
  })

  await seedRssFilter()
  await seedArticle()
  await seedCrypto()
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
