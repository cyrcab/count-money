import {prisma} from '../libs/prisma'

export async function seedArticle(){
    await prisma.article.createMany({
        data: [
            {
                title:"The Sandbox rencontre un adversaire redoutable : la nouvelle crypto-monnaie qui attire l’attention des investisseurs",
                link:"https://coinjournal.net/fr/actualites/the-sandbox-rencontre-un-adversaire-redoutable-la-nouvelle-crypto-monnaie-qui-attire-lattention-des-investisseurs/",
                imgSrc:"No imgSrc",
                userId: 1
            },
            {
                title:"Face à la stagnation des prix du Dogecoin et du PEPE, les investisseurs se tournent vers Rebel Satoshi pour de meilleurs rendements",
                link:"https://coinjournal.net/fr/actualites/face-a-la-stagnation-des-prix-du-dogecoin-et-du-pepe-les-investisseurs-se-tournent-vers-rebel-satoshi-pour-de-meilleurs-rendements/",
                imgSrc:"https://media.igms.io/2023/11/11/1702297576625-f3cb0047-50ba-4d65-89e1-d52d3af28994.png",
                userId: 1
            },
            {
                title:"The Sandbox rencontre un adversaire redoutable : la nouvelle crypto-monnaie qui attire l’attention des investisseurs",
                link:"https://coinjournal.net/fr/actualites/the-sandbox-rencontre-un-adversaire-redoutable-la-nouvelle-crypto-monnaie-qui-attire-lattention-des-investisseurs/",
                imgSrc:"No imgSrc",
                userId: 2
            },
            {
                title:"Face à la stagnation des prix du Dogecoin et du PEPE, les investisseurs se tournent vers Rebel Satoshi pour de meilleurs rendements",
                link:"https://coinjournal.net/fr/actualites/face-a-la-stagnation-des-prix-du-dogecoin-et-du-pepe-les-investisseurs-se-tournent-vers-rebel-satoshi-pour-de-meilleurs-rendements/",
                imgSrc:"https://media.igms.io/2023/11/11/1702297576625-f3cb0047-50ba-4d65-89e1-d52d3af28994.png",
                userId: 2
            }
        ]
    })
}