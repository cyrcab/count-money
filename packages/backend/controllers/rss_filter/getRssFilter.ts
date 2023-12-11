import {prisma} from '../../libs/prisma'

const prismaRssFilter = prisma.rSS_filter

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
