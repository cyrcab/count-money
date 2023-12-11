import {prisma} from '../../libs/prisma'
import { RSS_filter as RssFilterInterface } from '@prisma/client'

const prismaRssFilter = prisma.rSS_filter

export async function updateRss(data: Partial<RssFilterInterface>, id: number) {
        
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

            if(data && data.name) {
                rssFilter.name = data.name
            }

            if(data && data.url) {
                rssFilter.url = data.url
            }

            await prismaRssFilter.update({
                where: {
                    id: id,
                },
                data: {
                    name: rssFilter.name,
                    url: rssFilter.url,
                },
            })

            return { status: 200, body: { rssFilter }}
            
        } catch (error) {
            return { status: 500, body: { msg: error.message } }
        }
}