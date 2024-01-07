import {prisma} from '../../libs/prisma'
import { Article as ArticleInterface } from '@prisma/client'

const prismaArticle = prisma.article
const prismaUser = prisma.user

export async function addNewArticle(data: Partial<ArticleInterface>, userId: number) {

    const { title, link, imgSrc } = data

    if(!userId) {
        return { status: 400, body: { msg: 'You should be logged in' } }
    }

    const user = await prismaUser.findUnique({
        where: {
            id: userId,
        },
    })

    if (!user) {
        return { status: 404, body: { msg: 'No user '} }
    }

    if (!title || !link || !imgSrc  ) {
        return { status: 400, body: { msg: 'Please enter all fields' } }
    }

    // try {
        const article = await prismaArticle.create({
            data: {
                title: title,
                link: link,
                imgSrc: imgSrc,
                userId: userId,
            },
        })
        return { status: 201, body: {article, msg: 'Article ajouté' } }
    // }
    // catch (err) {
    //     return { status: 500, body: { msg: 'Server Error' } }
    // }
}