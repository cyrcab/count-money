import {prisma} from '../libs/prisma'

export async function seedCrypto(){
    await prisma.crypto.createMany({
        data: [
            {
                name:"Bitcoin",
                label:"BTC",
            },
            {
                name:"Etherum",
                label:"ETH",
            },  {
                name:"DogeCoin",
                label:"DOGE",
            },  {
                name:"LiteCoin",
                label:"LTC",
            },  {
                name:"Ripple",
                label:"XRP",
            },  {
                name:"Polkadot",
                label:"DOT",
            },  {
                name:"Solana",
                label:"SOL",
            },
        ]
    })
}