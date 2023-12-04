import { PrismaClient } from '@prisma/client';
import { registerUser } from '../controllers/auth/register';

const prisma = new PrismaClient();
// const app = express();

beforeAll(async () => {

    await prisma.$executeRaw`SET foreign_key_checks = 0;`;
    
    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`;

    await prisma.$executeRaw`SET foreign_key_checks = 1;`;
});

afterAll(async () => {
    // Disconnect from the database after all tests
    await prisma.$disconnect();

    // Close the server after all tests
});

describe('User Registration API', () => {
    it('should register a new user', async () => {
        const userData = {
            email: 'test@test.com',
            firstname: 'testF',
            lastname: 'testL',
            password: 'test',
        };

        const res = await registerUser(userData);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user.email).toBe(userData.email);
        expect(res.body.user.firstname).toBe(userData.firstname);
        expect(res.body.user.lastname).toBe(userData.lastname);
    });

    it('should not register a new user if email already exists', async () => {
        const userData = {
            email: 'test@test.com',
            firstname: 'testF',
            lastname: 'testL',
            password: 'test',
        };

        const res = await registerUser(userData);


        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toBe('Email already use');
    });

    it('should not register a new user if email is invalid', async () => {
        const userData = {
            email: 'test',
            firstname: 'testF',
            lastname: 'testL',
            password: 'test',
        };

        const res = await registerUser(userData);


        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toBe('Please enter a valid email');
    });

    it('should not register a new user if one field is empty', async () => {
        const userData = {
            email: 'test2@test.com',
            password: 'test',
        };

        const res = await registerUser(userData);


        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toBe('Please enter all fields');
    });

    it('should not register a new user if all fields are empty', async () => {
        const res = await registerUser({});


        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toBe('Please enter all fields');
    });
});
