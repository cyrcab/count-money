import {prisma} from '../../libs/prisma'

const prismaCrypto = prisma.crypto
const prismaUser = prisma.user
const prismaUserCrypto = prisma.userHasFavoriteCrypto

export async function deleteCrypUser(idUser: number, idCrypto: number) {
    if (!idUser || !idCrypto ) {
        return { status: 400, body: { msg: 'Please enter all fields' } }
    }
    
    try {
        const user = await prismaUser.findUnique({
            where: {
                id: idUser,
            },
        })

        if(!user) {
            return { status: 400, body: { msg: 'No user found' } }
        }

        const crypto = await prismaCrypto.findUnique({
            where: {
                id: idCrypto,
            },
        })

        if(!crypto) {
            return { status: 400, body: { msg: 'No crypto found' } }
        }

        const userCrypto = await prismaUserCrypto.findUnique({
            where: {
                userId_cryptoId: {
                    userId: idUser,
                    cryptoId: idCrypto
                }
            }
        })

        if(!userCrypto) {
            return { status: 400, body: { msg: 'No crypto found' } }
        }

        await prismaUserCrypto.delete({
            where: {
                userId_cryptoId: {
                    userId: idUser,
                    cryptoId: idCrypto
                }
            }
        })

        return { status: 200, body: { msg: 'Crypto deleted' } }

    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}