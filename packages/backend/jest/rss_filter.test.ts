import { getRssFilter, getRssFilters } from '../controllers/rss_filter/getRssFilter'
import {addNewRssFilter} from '../controllers/rss_filter/addRssFilter'
import { updateRss } from '../controllers/rss_filter/updateRssFilter'
import { deleteRss } from '../controllers/rss_filter/deleteRssFilter'
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

describe('Get RSS filter API', () => {
    it('should get a RSS filter', async () => {
            const req = {
            params: {
                id: '1',
            }
        }

        const res = await getRssFilter(req)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('rssFilter')
        expect(res.body.rssFilter).toHaveProperty('id')
        expect(res.body.rssFilter).toHaveProperty('name')
        expect(res.body.rssFilter).toHaveProperty('url')
        expect(res.body.rssFilter.id).toBe(1)
        expect(res.body.rssFilter.name).toBe('Actualités Bitcoin')
        expect(res.body.rssFilter.url).toBe('/tag/bitcoin/feed/')
    })

    it('should get new RSS filter', async () => {
        const req = {
            params: {
                id: '10',
            }
        }

        const res = await getRssFilter(req)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('rssFilter')
        expect(res.body.rssFilter).toHaveProperty('id')
        expect(res.body.rssFilter).toHaveProperty('name')
        expect(res.body.rssFilter).toHaveProperty('url')
        expect(res.body.rssFilter.id).toBe(10)
        expect(res.body.rssFilter.name).toBe('test')
        expect(res.body.rssFilter.url).toBe('test')
    })

    it('should not get a RSS filter', async () => {
        const req = {
            params: {
                id: '',
            }
        }

        const res = await getRssFilter(req)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Invalid credentials')
    })

    it('should not get a RSS filter', async () => {
        const req = {
            params: {
                id: '0',
            }
        }

        const res = await getRssFilter(req)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Invalid credentials')
    })
})

describe('Get all RSS filters API', () => {
    it('should get all RSS filters', async () => {
        const res = await getRssFilters()

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('rssFilters')
        expect(res.body.rssFilters).toHaveLength(10)
    })

    it('should get all RSS filters', async () => {

        await prisma.$executeRaw`SET foreign_key_checks = 0;`
        await prisma.$executeRaw`TRUNCATE TABLE RSS_filter;`
        await prisma.$executeRaw`SET foreign_key_checks = 1;`

        const res = await getRssFilters()

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('No RSS filters found')
    })
})

describe('Update RSS filter API', () => {

    it('should update a RSS filter', async () => {
        await execAsync('ts-node prisma/seed.ts')


        const data = {
            name: 'test2',
            url: 'test2',
        }

        const res = await updateRss(data, 1)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('rssFilter')
        expect(res.body.rssFilter).toHaveProperty('id')
        expect(res.body.rssFilter).toHaveProperty('name')
        expect(res.body.rssFilter).toHaveProperty('url')
        expect(res.body.rssFilter.id).toBe(1)
        expect(res.body.rssFilter.name).toBe('test2')
        expect(res.body.rssFilter.url).toBe('test2')
    })

    it('should update a RSS filter', async () => {
        const data = {
            name: 'test3',
            url: '',
        }

        const res = await updateRss(data, 9)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('rssFilter')
        expect(res.body.rssFilter).toHaveProperty('id')
        expect(res.body.rssFilter).toHaveProperty('name')
        expect(res.body.rssFilter).toHaveProperty('url')
        expect(res.body.rssFilter.id).toBe(9)
        expect(res.body.rssFilter.name).toBe('test3')
        expect(res.body.rssFilter.url).toBe('/category/evenements/feed/')
    })

    it('should update a RSS filter', async () => {
        const data = {
            name: '',
            url: 'test4',
        }

        const res = await updateRss(data, 9)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('rssFilter')
        expect(res.body.rssFilter).toHaveProperty('id')
        expect(res.body.rssFilter).toHaveProperty('name')
        expect(res.body.rssFilter).toHaveProperty('url')
        expect(res.body.rssFilter.id).toBe(9)
        expect(res.body.rssFilter.name).toBe('test3')
        expect(res.body.rssFilter.url).toBe('test4')
    })

    it('should not update a RSS filter', async () => {
        const data = {
            name: '',
            url: '',
        }

        const res = await updateRss(data, 20)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('No RSS filter found')
    })
})

describe('Delete RSS filter API', () => {
    
    it('should delete a RSS filter', async () => {
        const res = await deleteRss(1)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('rssFilter')
        expect(res.body.rssFilter).toHaveProperty('id')
        expect(res.body.rssFilter).toHaveProperty('name')
        expect(res.body.rssFilter).toHaveProperty('url')
        expect(res.body.rssFilter.id).toBe(1)
        expect(res.body.rssFilter.name).toBe('test2')
        expect(res.body.rssFilter.url).toBe('test2')
    })

    it('should not delete a RSS filter', async () => {
        const res = await deleteRss(20)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('No RSS filter found')
    })
})
