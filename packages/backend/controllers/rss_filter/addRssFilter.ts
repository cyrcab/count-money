import {prisma} from '../../libs/prisma'
import { RSS_filter as RssFilterInterface } from '@prisma/client'

const prismaRssFilter = prisma.rSS_filter
const prismaUser = prisma.user
const prismaRssFilterUser = prisma.userRSS_filter

export async function addNewRssFilter(data: Partial<RssFilterInterface>) {

    const { name, url } = data
    

    if (!name || !url ) {
        return { status: 400, body: { msg: 'Please enter all fields' } }
    }

    try {
        const rssFilter = await prismaRssFilter.create({
            data: {
                name: name,
                url: url,
            },
        })
        return { status: 201, body: { rssFilter } }
    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}

export async function addRssToUser(idUser: number, idRss: number) {

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

        if(userRssFilter) {
            return { status: 400, body: { msg: 'RSS filter already added' } }
        }

        await prismaRssFilterUser.create({
            data: {
                userId: idUser,
                RSS_filterId: idRss,
            },
        })

        return { status: 201, body: { msg: 'RSS filter added' } }
    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}