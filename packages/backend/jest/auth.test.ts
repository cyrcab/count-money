import { PrismaClient } from '@prisma/client';
import { registerUser } from '../controllers/auth/register';
import { loginUser } from '../controllers/auth/login';

const prisma = new PrismaClient();

beforeAll(async () => {

    await prisma.$executeRaw`SET foreign_key_checks = 0;`;
    
    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`;

    await prisma.$executeRaw`SET foreign_key_checks = 1;`;
});

afterAll(async () => {

    await prisma.$executeRaw`SET foreign_key_checks = 0;`;
    
    // Clear database before tests
    await prisma.$executeRaw`TRUNCATE TABLE User;`;

    await prisma.$executeRaw`SET foreign_key_checks = 1;`;
    
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

// Check login
describe('User login', () => {
    it('should login a user', async () => {
        const userData = {
            email: 'test@test.com',
            password: 'test',
        };

        const res = await loginUser(userData);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user.email).toBe(userData.email);
    });

    it('should not login a user if email is invalid', async () => {
        const userData = {
            email: 'test',
            password: 'test',
        };

        const res = await loginUser(userData);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toBe('Please enter a valid email');
    });

    it('should not login a user if email is not found', async () => {
        const userData = {
            email: 'test2@gmail.com',
            password: 'test',
        };

        const res = await loginUser(userData);
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toBe('Invalid credentials');
    });

    it('should not login a user if password is incorrect', async () => {
        const userData = {
            email: 'test@test.com',
            password: 'test2',
        };

        const res = await loginUser(userData);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toBe('Invalid credentials');
    });

})

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
