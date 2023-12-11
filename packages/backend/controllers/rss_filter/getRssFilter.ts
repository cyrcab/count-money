import {prisma} from '../../libs/prisma'

const prismaRssFilter = prisma.rSS_filter

export interface ParamRequest extends Request {
    params: {
        id: string
    }
}



export async function getRssFilter(req: ParamRequest) {

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