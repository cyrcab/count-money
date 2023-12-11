import {prisma} from '../../libs/prisma'

const prismaRssFilter = prisma.rSS_filter

export async function deleteRss(id: number) {
            
    if (!id ) {
        return { status: 400, body: { msg: 'Please enter id' } }
    }

    try {
        const rssFilter = await prismaRssFilter.findUnique({
            where: {
                id: id,
            },
        })

        if(!rssFilter) {
            return { status: 400, body: { msg: 'No RSS filter found' } }
        }

        await prismaRssFilter.delete({
            where: {
                id: id,
            },
        })

        return { status: 200, body: { rssFilter }}
        
    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}
