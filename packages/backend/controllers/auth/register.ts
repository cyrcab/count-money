import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
// eslint-disable-next-line
import {User as UserInterface} from '@prisma/client';
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

export async function registerUser(data:  Partial<UserInterface>) {

    const {
        email,
        firstname,
        lastname,
        password,
    } = data;

    if (!email || !firstname || !lastname || !password) {
        return { status: 400, body: { msg: 'Please enter all fields' } };
    }

    // check if email is valid
    if (!regexEmail.test(email)) {
        return { status: 400, body: { msg: 'Please enter a valid email' } };
    }
    try {
        // check if user already exists
        const user = await prismaUser.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            return { status: 400, body: { msg: 'Email already use' } };
        }

        // hash password
        const hashPwd = await generatePwd(password);

        // create new user
        const newUser = await prismaUser.create({
            data: {
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashPwd,
            },
        });
        const token = generateToken(newUser);
            return { status: 201, body: { token, user: {
                    id: newUser.id,
                    email: newUser.email,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                },
            },
        };

        
    } catch (err) {
        return { status: 500, body: { msg: 'Server Error' } };
    }
}
