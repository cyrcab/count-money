import {getRssReader} from '../controllers/rss/getRss'
import {prisma} from '../libs/prisma'
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)

beforeAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`
    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`
    await prisma.$executeRaw`TRUNCATE TABLE RSS_filter;`
    await prisma.$executeRaw`TRUNCATE TABLE UserRSS_filter;`
    await prisma.$executeRaw`SET foreign_key_checks = 1;`

    await execAsync('ts-node prisma/seed.ts')
})
afterAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`

    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`
    await prisma.$executeRaw`TRUNCATE TABLE RSS_filter;`
    await prisma.$executeRaw`TRUNCATE TABLE UserRSS_filter;`
    await prisma.$executeRaw`SET foreign_key_checks = 1;`


    // Disconnect from the database after all tests
    await prisma.$disconnect()

// Close the server after all tests
})


describe('RSS reader', () => {
    it('should return an array of RSS feeds', async () => {
        const result = await getRssReader( {body: {userId: 1}} )
        expect(result).toBeDefined()
        expect(result.status).toBe(200)
        expect(result.body).toBeDefined()
        expect(result.body).toBeInstanceOf(Object)
        expect(result.body.msg).toBeDefined()
        expect(result.body.msg).toBe('Flux recupéré')
    })

    it('should return an array of RSS feeds', async () => {
        const result = await getRssReader({body: {test: 1}})
        expect(result).toBeDefined()
        expect(result.status).toBe(200)
        expect(result.body).toBeDefined()
        expect(result.body).toBeInstanceOf(Object)
        expect(result.body.msg).toBeDefined()
        expect(result.body.msg).toBe('Flux recupéré')
    })

    it('Should not return an array of RSS feeds', async () => {
        const result = await getRssReader({body: {userId: 90}})
        expect(result).toBeDefined()
        expect(result.status).toBe(404)
        expect(result.body).toBeDefined()
        expect(result.body.msg).toBeDefined()
        expect(result.body.msg).toBe('Utilisateur introuvable')
    })
})

