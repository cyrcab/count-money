import { prisma } from '../libs/prisma'
import { app } from '../index'
import supertest = require('supertest')
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)

const cryptoTest = supertest(app)

describe('Crypto API', () => {
  beforeAll(async () => {
    await prisma.$executeRaw`SET foreign_key_checks = 0;`

    // Clear database before tests
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
  })

  it('should create a new crypto', async () => {
    const response = await cryptoTest.post('/api/crypto').send({
      name: 'Bitcoin',
      label: 'BTC',
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('label')
  })

  it('should not create a new crypto if crypto already exists', async () => {
    const response = await cryptoTest.post('/api/crypto').send({
      name: 'Bitcoin',
      label: 'BTC',
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Crypto already exists')
  })

  it('should not create a new crypto if name is missing', async () => {
    const response = await cryptoTest.post('/api/crypto').send({
      label: 'BTC',
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Bad request')
  })

  it('should not create a new crypto if label is missing', async () => {
    const response = await cryptoTest.post('/api/crypto').send({
      name: 'Bitcoin',
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Bad request')
  })

  it('should get all crypto', async () => {
    const response = await cryptoTest.get('/api/crypto')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  it('should get one crypto', async () => {
    const response = await cryptoTest.get('/api/crypto/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('label')
  })

  it('should not get one crypto if crypto does not exist', async () => {
    const response = await cryptoTest.get('/api/crypto/2')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Not found')
  })

  it('should update a crypto', async () => {
    const response = await cryptoTest.put('/api/crypto/1').send({
      name: 'Bitcoin',
      label: 'BTC',
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('label')
  })

  it('should not update a crypto if crypto does not exist', async () => {
    const response = await cryptoTest.put('/api/crypto/2').send({
      name: 'Bitcoin',
      label: 'BTC',
    })
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Crypto does not exist')
  })

  it('should delete a crypto', async () => {
    const response = await cryptoTest.delete('/api/crypto/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('label')
  })

  it('should not delete a crypto if crypto does not exist', async () => {
    const response = await cryptoTest.delete('/api/crypto/2')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Crypto does not exist')
  })
})
