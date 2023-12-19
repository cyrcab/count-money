import {prisma} from '../../libs/prisma'
import { Article as ArticleInterface } from '@prisma/client'

const prismaArticle = prisma.article
const prismaUser = prisma.user

export async function addNewArticle(data: Partial<ArticleInterface>, userId: number) {

    const { titre, url, description, image } = data

    if(!userId) {
        return { status: 400, body: { msg: 'You should be logged in' } }
    }

    const user = await prismaUser.findUnique({
        where: {
            id: userId,
        },
    })

    if (!user) {
        return { status: 404, body: { msg: 'No user' } }
    }

    if (!titre || !url || !description || !image  ) {
        console.log("titre" + titre + "url" + url + "description" + description + "image" + image)
        return { status: 400, body: { msg: 'Please enter all fields' } }
    }

    try {
        const article = await prismaArticle.create({
            data: {
                titre: titre,
                url: url,
                description: description,
                image: image,
                userId: userId,
            },
        })
        return { status: 200, body: {article, msg: 'Article ajouté' } }
    }
    catch (err) {
        return { status: 500, body: { msg: 'Server Error' } }
    }
}