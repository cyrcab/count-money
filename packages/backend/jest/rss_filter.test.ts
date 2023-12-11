import {addNewRssFilter} from '../controllers/rss_filter/addRssFilter'
import {prisma} from '../libs/prisma'
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)

beforeAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`
  
    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`
    await prisma.$executeRaw`TRUNCATE TABLE RSS_filter;`
  
    await prisma.$executeRaw`SET foreign_key_checks = 1;`

    await execAsync('ts-node prisma/seed.ts')
})
afterAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`

    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`
    await prisma.$executeRaw`TRUNCATE TABLE RSS_filter;`

    await prisma.$executeRaw`SET foreign_key_checks = 1;`


    // Disconnect from the database after all tests
    await prisma.$disconnect()

// Close the server after all tests
})

describe('Add new RSS filter API', () => {
    it('should add a new RSS filter', async () => {
        const data = {
            name: 'test',
            url: 'test',
        }

        const res = await addNewRssFilter(data)

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('rssFilter')
        expect(res.body.rssFilter).toHaveProperty('id')
        expect(res.body.rssFilter).toHaveProperty('name')
        expect(res.body.rssFilter).toHaveProperty('url')
        expect(res.body.rssFilter.id).toBe(10)
        expect(res.body.rssFilter.name).toBe('test')
        expect(res.body.rssFilter.url).toBe('test')
    })

    it('should not add a new RSS filter', async () => {
        const data = {
            name: '',
            url: '',
        }

        const res = await addNewRssFilter(data)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter all fields')
    })

    it('should not add a new RSS filter', async () => {
        const data = {
            name: 'test',
            url: '',
        }

        const res = await addNewRssFilter(data)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter all fields')
    })

    it('should not add a new RSS filter', async () => {
        const data = {
            name: '',
            url: 'test',
        }

        const res = await addNewRssFilter(data)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter all fields')
    })
})
