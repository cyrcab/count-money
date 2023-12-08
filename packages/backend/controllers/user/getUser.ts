import {prisma} from '../../libs/prisma'
import AuthenticatedRequest from '../../interfaces/request.interface'

const prismaUser = prisma.user

export async function getUser(data: Partial<AuthenticatedRequest>) {

    if (!data.userId) {
        return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    // Check type of userId
    if (typeof data.userId !== 'number') {
        return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    const user = await prismaUser.findUnique({
        where: {
          id: data.userId,
        },
      });

    if (!user) {
        return { status: 400, body: { msg: 'Invalid credentials' } }
    }

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