import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const prismaUser = new PrismaClient().user;

// regex for email validation
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// function to generate token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateToken(user: any) {
  return jwt.sign({id: user.id}, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
}

// function to generate password hash
async function generatePwd(pwd: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
}

// function to register user
export async function register(req: Request, res: Response) {
    // get data from request body
    const {
        email,
        firstname,
        lastname,
        password,
    } = req.body;

    // check if fields are not empty
    if (!email || !firstname || !lastname || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // check if email is valid
    if (!regexEmail.test(email)) {
        return res.status(400).json({ msg: 'Please enter a valid email' });
    }

    // check if user already exists
    const user = await prismaUser.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        return res.status(400).json({ msg: 'Email already use' });
    }

    // hash password
    const hashPwd = await generatePwd(password);

    // create new user
    try {
        const newUser = await prismaUser.create({
            data: {
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashPwd,
            },
        });
        const token = generateToken(newUser);
        return res.status(201).json({
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
            },
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
