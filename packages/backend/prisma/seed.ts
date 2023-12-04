import { PrismaClient } from '@prisma/client'
import { generatePwd } from '../controllers/auth/utils/Pwd'
const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
        data: {
            email: 'ribcoco@gmail.com',
            firstname: 'Ricardo',
            lastname: 'Coco',
            password: await generatePwd('MDP'),
        },
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})