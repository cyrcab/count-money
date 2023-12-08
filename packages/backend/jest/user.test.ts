import {getUser} from '../controllers/user/getUser'
import {prisma} from '../libs/prisma'
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)

beforeAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`
  
    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`
  
    await prisma.$executeRaw`SET foreign_key_checks = 1;`

    await execAsync('ts-node prisma/seed.ts')
})
afterAll(async () => {
await prisma.$executeRaw`SET foreign_key_checks = 0;`

// Clear database before tests
await prisma.$executeRaw`TRUNCATE TABLE User;`

await prisma.$executeRaw`SET foreign_key_checks = 1;`


// Disconnect from the database after all tests
await prisma.$disconnect()

// Close the server after all tests
})

describe('CRUD User API', () => {
    it('should get a user', async () => {
        const data = {
            userId: 1,
        }

        const res = await getUser(data)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('id')
        expect(res.body.user).toHaveProperty('email')
        expect(res.body.user).toHaveProperty('firstname')
        expect(res.body.user).toHaveProperty('lastname')
        expect(res.body.user).toHaveProperty('role')
        expect(res.body.user.id).toBe(1)
        expect(res.body.user.email).toBe('ribcoco@gmail.com')
        expect(res.body.user.firstname).toBe('Ricardo')
        expect(res.body.user.lastname).toBe('Coco')
        expect(res.body.user.role).toBe(2)
    })

    it('should get a admin', async () => {
        const userData = {
            userId: 2,
        }

        const res = await getUser(userData)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('id')
        expect(res.body.user).toHaveProperty('email')
        expect(res.body.user).toHaveProperty('firstname')
        expect(res.body.user).toHaveProperty('lastname')
        expect(res.body.user).toHaveProperty('role')
        expect(res.body.user.id).toBe(2)
        expect(res.body.user.email).toBe('ribcoco2@gmail.com')
        expect(res.body.user.firstname).toBe('Rib')
        expect(res.body.user.lastname).toBe('Coco2')
        expect(res.body.user.role).toBe(1)
    })

    it('should not get a user if id is invalid', async () => {
        const userData = {
            userId: 0,
        }

        const res = await getUser(userData)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Invalid credentials')
    })


})