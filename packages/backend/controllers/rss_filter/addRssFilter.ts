import {prisma} from '../../libs/prisma'
import { RSS_filter as RssFilterInterface } from '@prisma/client'

const prismaRssFilter = prisma.rSS_filter

export async function addNewRssFilter(data: Partial<RssFilterInterface>) {

    const { name } = data

    if (!name) {
        return { status: 400, body: { msg: 'Please enter all fields' } }
    }

    try {
        const rssFilter = await prismaRssFilter.create({
            data: {
                name: name,
            },
        })
        return { status: 201, body: { rssFilter } }
    } catch (error) {
        return { status: 500, body: { msg: error.message } }
    }
}