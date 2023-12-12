import { updateUser } from '../controllers/user/updateUser'
import {getUser, getUsers} from '../controllers/user/getUser'
import {prisma} from '../libs/prisma'
import { exec } from 'child_process'
import { promisify } from 'util'
import { deleteUser } from '../controllers/user/deleteUser'
const execAsync = promisify(exec)

beforeAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`
  
    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`
    await prisma.$executeRaw`TRUNCATE TABLE Article;`
    await prisma.$executeRaw`TRUNCATE TABLE Crypto;`
  
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

describe('Get one User API', () => {
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

describe('Get all Users API', () => {
    it('should get all users', async () => {
        const res = await getUsers()

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('users')
        expect(res.body.users).toHaveLength(2)

    })

})

describe('Update User API', () => {
    it('should update a user', async () => {
        const data = {
            userId: 1,
            firstname: 'Ricardo2',
            lastname: 'Coco2',
            email: 'ribcoco3@gmail.com'
        }

        const res = await updateUser(data)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('id')
        expect(res.body.user).toHaveProperty('email')
        expect(res.body.user).toHaveProperty('firstname')
        expect(res.body.user).toHaveProperty('lastname')
        expect(res.body.user).toHaveProperty('role')
        expect(res.body.user.id).toBe(1)
        expect(res.body.user.email).toBe('ribcoco3@gmail.com')
        expect(res.body.user.firstname).toBe('Ricardo2')
        expect(res.body.user.lastname).toBe('Coco2')
        expect(res.body.user.role).toBe(2)
    })

    it('should only update firstname', async () => {
        const data = {
            userId: 1,
            firstname: 'Ricardo3',
        }

        const res = await updateUser(data)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('id')
        expect(res.body.user).toHaveProperty('email')
        expect(res.body.user).toHaveProperty('firstname')
        expect(res.body.user).toHaveProperty('lastname')
        expect(res.body.user).toHaveProperty('role')
        expect(res.body.user.id).toBe(1)
        expect(res.body.user.email).toBe('ribcoco3@gmail.com')
        expect(res.body.user.firstname).toBe('Ricardo3')
        expect(res.body.user.lastname).toBe('Coco2')
        expect(res.body.user.role).toBe(2)
    })

    it('should only update lastname', async () => {
        const data = {
            userId: 1,
            lastname: 'Coco3',
        }

        const res = await updateUser(data)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('id')
        expect(res.body.user).toHaveProperty('email')
        expect(res.body.user).toHaveProperty('firstname')
        expect(res.body.user).toHaveProperty('lastname')
        expect(res.body.user).toHaveProperty('role')
        expect(res.body.user.id).toBe(1)
        expect(res.body.user.email).toBe('ribcoco3@gmail.com')
        expect(res.body.user.firstname).toBe('Ricardo3')
        expect(res.body.user.lastname).toBe('Coco3')
        expect(res.body.user.role).toBe(2)
    })

    it('should only update email', async () => {
        const data = {
            userId: 1,
            email: 'ribcoco4@gmail.com',
        }

        const res = await updateUser(data)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('id')
        expect(res.body.user).toHaveProperty('email')
        expect(res.body.user).toHaveProperty('firstname')
        expect(res.body.user).toHaveProperty('lastname')
        expect(res.body.user).toHaveProperty('role')
        expect(res.body.user.id).toBe(1)
        expect(res.body.user.email).toBe('ribcoco4@gmail.com')
        expect(res.body.user.firstname).toBe('Ricardo3')
        expect(res.body.user.lastname).toBe('Coco3')
        expect(res.body.user.role).toBe(2)
    })

    it('should not update a user if id is invalid', async () => {
        const userData = {
            userId: 0,
            firstname: 'Ricardo3',
            lastname: 'Coco3',
            email: 'ribcoco5@gmail.com'
        }

        const res = await updateUser(userData)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Invalid credentials')
    })

    it('should not update a user if email is invalid', async () => {
        const userData = {
            userId: 1,
            firstname: 'Ricardo3',
            lastname: 'Coco3',
            email: 'invalidEmail'
        }

        const res = await updateUser(userData)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter a valid email')
    })

    it('should not update a user if email is already taken', async () => {
        const userData = {
            userId: 1,
            firstname: 'Ricardo3',
            lastname: 'Coco3',
            email: 'ribcoco2@gmail.com'
        }

        const res = await updateUser(userData)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Email already taken')
    })
})

describe('Delete User API', () => {

    it('should delete a user', async () => {
        const data = {
            userId: 1,
        }

        const res = await deleteUser(data)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('User deleted')
    })

    it('should not delete a user if id is invalid', async () => {
        const userData = {
            userId: 0,
        }

        const res = await deleteUser(userData)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Invalid credentials')
    })
})

