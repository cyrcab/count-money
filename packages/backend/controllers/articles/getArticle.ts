import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export interface ParamRequest extends Request {
    params: {
        id: string
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getArticles(req: Partial<Request>) {
    try {
        const articles = await prisma.article.findMany({
            select: {
                id: true,
                title: true,
                link: true,
                imgSrc: true,
                userId: true,
            }
        })

        if(!articles.length) { return { status: 400, body: { msg: 'No articles found' } } }

        return {
            status: 200,
            body: {
                articles: articles,
                msg: 'Articles found'
            }
        }

    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}