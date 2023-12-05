import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  datasourceUrl:
    process.env.NODE_ENV === 'test ' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
})
