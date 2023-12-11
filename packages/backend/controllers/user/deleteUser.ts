import {prisma} from '../../libs/prisma'
import AuthenticatedRequest from '../../interfaces/request.interface'

const prismaUser = prisma.user

export async function deleteUser(request: Partial<AuthenticatedRequest>) {
    if(!request.userId) {
        return {status: 400, body: {msg: 'Invalid credentials'}}
    }

    if(typeof request.userId !== 'number') {
        return {status: 400, body: {msg: 'Invalid credentials'}}
    }

    const user = await prismaUser.findUnique({
        where: {
            id: request.userId
        }
    })

    if(!user) {
        return {status: 400, body: {msg: 'Invalid credentials'}}
    }

    await prismaUser.delete({
        where: {
            id: user.id
        }
    })

    return {status: 200, body: {msg: 'User deleted'}}
}