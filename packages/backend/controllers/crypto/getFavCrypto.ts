import {prisma} from '../../libs/prisma'

const prismaUser = prisma.user
const prismaUserCrypto = prisma.userHasFavoriteCrypto

export async function getFavCrypto(idUser: number) {
    if(!idUser) { return { status: 400, body: { msg: 'Please enter id' } } }

    try {
        const user = await prismaUser.findUnique({
            where: {
                id: idUser,
            },
        })

        if(!user) { return { status: 400, body: { msg: 'No user found' } } }

        const userCrypto = await prismaUserCrypto.findMany({
            where: {
                userId: idUser,
            },
            select: {
                crypto: true,
            }
        })

        if(!userCrypto.length) { return { status: 400, body: { msg: 'No crypto found' } } }
        const formattedUserCrypto = userCrypto.map((crypto) => {
            return crypto.crypto
        })

        return {
            status: 200,
            body: {
                userCrypto: formattedUserCrypto,
                msg: 'User crypto found'
            }
        }

    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}
