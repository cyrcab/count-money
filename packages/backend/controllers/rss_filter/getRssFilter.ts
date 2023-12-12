import {prisma} from '../../libs/prisma'

const prismaRssFilter = prisma.rSS_filter
const prismaUser = prisma.user
const prismaRssFilterUser = prisma.userRSS_filter

export interface ParamRequest extends Request {
    params: {
        id: string
    }
}



export async function getRssFilter(req: Partial<ParamRequest>) {

    const rssFilterId = req.params.id
    if(!rssFilterId) return { status: 400, body: { msg: 'Invalid credentials' } }

    const rssFilter = await prismaRssFilter.findUnique({
        where: {
          id: parseInt(rssFilterId),
        },
      });

    if (!rssFilter) {
        return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    return {
        status: 200,
        body: {
            rssFilter: {
                id: rssFilter.id,
                name: rssFilter.name,
                url: rssFilter.url,
            },
        }
    }
}

export async function getRssFilters() {
    const rssFilters = await prismaRssFilter.findMany({
        select: {
            id: true,
            name: true,
            url: true,
        }
    })

    if(!rssFilters.length) { return { status: 400, body: { msg: 'No RSS filters found' } } }

    return {
        status: 200,
        body: {
            rssFilters: rssFilters,
            msg: 'Rss Filters found'
        }
    }
}

export async function getRssFiltersByUser(idUser: number) {

    if (!idUser ) {
        return { status: 400, body: { msg: 'Please enter id' } }
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

        const rssFilters = await prismaRssFilterUser.findMany({
            where: {
                userId: idUser,
            },
            select: {
                RSS_filter: true,
            }
        })

        if(!rssFilters.length) { return { status: 400, body: { msg: 'No RSS filters found' } } }

        return {
            status: 200,
            body: {
                rssFilters: rssFilters,
                msg: 'Rss Filters found'
            }
        }
    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}
