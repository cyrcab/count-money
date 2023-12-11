import { prisma } from '../libs/prisma'

export async function seedRssFilter() {
  await prisma.rSS_filter.createMany({
    data: [
      {
        name: 'Actualités Bitcoin',
        url: '/tag/bitcoin/feed/'
      },
      {
        name: 'Actualités France',
        url: '/tag/france/feed/'
      },
      {
        name: 'Actualités Ethereum',
        url: '/tag/ethereum/feed/'
      },
      {
        name: 'Actualités Wallets',
        url: '/tag/wallets/feed/'
      },
      {
        name: 'Actualités Ripple',
        url: '/tag/ripple/feed/'
      },
      {
        name: 'Actualités Brokers',
        url: '/tag/brokers/feed/'

      },
      {
        name: 'Actualités Échanges',
        url: '/tag/exchanges/feed/'
      },
      {
        name: 'Actualités Blockchain',
        url: '/category/technologie/feed/'
      },
      {
        name: 'Évènements',
        url: '/category/evenements/feed/'
      }
    ],

   
  })
}