import { prisma } from '../../libs/prisma';

const prismaCrypto = prisma.crypto;
const prismaUser = prisma.user;

export async function addFavoriteCrypto(idUser: number, idCrypto: number) {

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

        const userCrypto = await prisma.userHasFavoriteCrypto.findUnique({
            where: {
                userId_cryptoId: {
                  userId: idUser,
                  cryptoId: idCrypto
                }
            },
        })

        if(userCrypto) {
            return { status: 400, body: { msg: 'Crypto already in user favorites' } }
        }

        const newUserCrypto = await prisma.userHasFavoriteCrypto.create({
            data: {
                user: {
                    connect: {
                        id: idUser,
                    },
                },
                crypto: {
                    connect: {
                        id: idCrypto,
                    },
                },
            },
        })

        return { status: 201, body: { newUserCrypto } }
    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}
