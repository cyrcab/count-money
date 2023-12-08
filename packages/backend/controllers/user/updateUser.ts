import {prisma} from '../../libs/prisma'
import AuthenticatedRequest from '../../interfaces/request.interface'
import { User as UserInterface } from '@prisma/client'

const prismaUser = prisma.user

export async function updateUser(request: Partial<AuthenticatedRequest>) {

    if (!request.userId) {
        return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    // Check type of userId
    if (typeof request.userId !== 'number') {
        return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    const user = await prismaUser.findUnique({
        where: {
          id: request.userId,
        },
      });

    if (!user) {
        return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    const data = request.body as Partial<UserInterface>

    if (data.firstname) {
        user.firstname = data.firstname
    }

    if (data.lastname) {
        user.lastname = data.lastname
    }

    if (data.email) {
        user.email = data.email
    }
    if (data.email) {
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!regexEmail.test(data.email)) {
            return { status: 400, body: { msg: 'Please enter a valid email' } }
        }
        const emailExists = await prismaUser.findUnique({
            where: {
                email: data.email,
            },
        })
        if (emailExists) {
            return { status: 400, body: { msg: 'Email already taken' } }
        }
    }

    await prismaUser.update({
        where: {
            id: user.id,
        },
        data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
    })

    return {
        status: 200,
        body: {
            user: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.roleId,
            },
        }
    }   
    
}