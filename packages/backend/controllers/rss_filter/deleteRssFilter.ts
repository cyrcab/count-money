import {prisma} from '../../libs/prisma'

const prismaRssFilter = prisma.rSS_filter
const prismaUser = prisma.user
const prismaRssFilterUser = prisma.userRSS_filter

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

export async function deleteRssToUser(idUser: number, idRss: number) {
    
        if (!idUser || !idRss ) {
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
    
            const rssFilter = await prismaRssFilter.findUnique({
                where: {
                    id: idRss,
                },
            })
    
            if(!rssFilter) {
                return { status: 400, body: { msg: 'No RSS filter found' } }
            }
    
            const userRssFilter = await prismaRssFilterUser.findUnique({
                where: {
                    userId_RSS_filterId: {
                    userId: idUser,
                    RSS_filterId: idRss,
                    },
                },
            })
    
            if(!userRssFilter) {
                return { status: 400, body: { msg: 'No RSS filter found' } }
            }
    
            await prismaRssFilterUser.delete({
                where: {
                    userId_RSS_filterId: {
                    userId: idUser,
                    RSS_filterId: idRss,
                    },
                },
            })
    
            return { status: 200, body: { userRssFilter }}
            
        } catch (error) {
            return { status: 500, body: { msg: error.message } }
        }
}
