import {prisma} from '../../libs/prisma'

const prismaUser = prisma.user
const prismaArticle = prisma.article

export async function deleteArticleUser(idUser: number, idArticle: string) {
    if (!idUser || !idArticle ) {
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

        const article = await prismaArticle.findUnique({
            where: {
                id: parseInt(idArticle, 10),
            },
        })

        if(!article) {
            return { status: 400, body: { msg: 'No article found' } }
        }

        await prismaArticle.delete({
            where: {
                id: parseInt(idArticle, 10),
            },
        })

        return { status: 200, body: { msg: 'Article deleted' } }
        
    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}