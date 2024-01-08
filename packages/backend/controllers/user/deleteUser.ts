import {prisma} from '../../libs/prisma'
import AuthenticatedRequest from '../../interfaces/request.interface'

const prismaUser = prisma.user

export async function deleteUser(id: number) {
    if(!id) {
        return {status: 400, body: {msg: 'Invalid credentials'}}
    }

    if(typeof id !== 'number') {
        return {status: 400, body: {msg: 'Invalid credentials'}}
    }

    const user = await prismaUser.findUnique({
        where: {
            id: id,
        }
    })

    if(!user) {
        return {status: 400, body: {msg: 'Invalid credentials'}}
    }
    await prisma.article.deleteMany({
        where: {
            userId: id,
        },
    });

    await prisma.userRSS_filter.deleteMany({
        where: {
            userId: id,
        },
    });

    await prisma.refreshToken.deleteMany({
        where: {
            userId: id,
        },
    });

    await prisma.userHasFavoriteCrypto.deleteMany({
        where: {
            userId: id,
        },
    });

    await prismaUser.delete({
        where: {
            id: user.id,
        },
    })

    return {status: 200, body: {msg: 'User deleted'}}
}