import {prisma} from '../libs/prisma'
import { exec } from 'child_process'
import { promisify } from 'util'    
import {addNewArticle} from '../controllers/articles/addArticle'
const execAsync = promisify(exec)

beforeAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`
  
    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`
    await prisma.$executeRaw`TRUNCATE TABLE Article;`
    await prisma.$executeRaw`TRUNCATE TABLE RSS_filter;`
    await prisma.$executeRaw`TRUNCATE TABLE UserRSS_filter;`
    await prisma.$executeRaw`TRUNCATE TABLE Crypto;`
  
    await prisma.$executeRaw`SET foreign_key_checks = 1;`

    await execAsync('ts-node prisma/seed.ts')
})
afterAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`

    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`
    await prisma.$executeRaw`TRUNCATE TABLE RSS_filter;`
    await prisma.$executeRaw`TRUNCATE TABLE UserRSS_filter;`
    await prisma.$executeRaw`TRUNCATE TABLE Article;`
    await prisma.$executeRaw`TRUNCATE TABLE Crypto;`
    await prisma.$executeRaw`SET foreign_key_checks = 1;`


    // Disconnect from the database after all tests
    await prisma.$disconnect()

// Close the server after all tests
})

describe('Add one Article API', () => {
    it('should add an article', async () => {
        const data = {
            titre: "test",
            url: "test",
            description: "test",
            image: "test",
        }

        const res = await addNewArticle(data, 1)

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('article')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Article ajouté')
        expect(res.body.article).toHaveProperty('titre')
        expect(res.body.article).toHaveProperty('url')
        expect(res.body.article).toHaveProperty('description')
        expect(res.body.article).toHaveProperty('image')
        expect(res.body.article.titre).toBe('test')
        expect(res.body.article.url).toBe('test')
        expect(res.body.article.description).toBe('test')
        expect(res.body.article.image).toBe('test')

    })

    it('should not add an article if no user', async () => {
        const data = {
            titre: "test",
            url: "test",
            description: "test",
            image: "test",
        }

        const res = await addNewArticle(data, null)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('You should be logged in')

    })

    it('should not add an article if no titre', async () => {
        const data = {
            url: "test",
            description: "test",
            image: "test",
        }

        const res = await addNewArticle(data, 1)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter all fields')
    })

    it('should not add an article if no url', async () => {
        const data = {
            titre: "test",
            description: "test",
            image: "test",
        }

        const res = await addNewArticle(data, 1)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter all fields')
    })

    it('should not add an article if no description', async () => {
        const data = {
            titre: "test",
            url: "test",
            image: "test",
        }

        const res = await addNewArticle(data, 1)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter all fields')
    })

    it('should not add an article if no image', async () => {
        const data = {
            titre: "test",
            url: "test",
            description: "test",
        }

        const res = await addNewArticle(data, 1)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter all fields')
    })

    it('should not add an article if no data', async () => {
        const data = {}

        const res = await addNewArticle(data, 1)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Please enter all fields')
    })

    it('should not add an article if no user', async () => {
        const data = {
            titre: "test",
            url: "test",
            description: "test",
            image: "test",
        }

        const res = await addNewArticle(data, 9999)

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('No user')
    })
})
