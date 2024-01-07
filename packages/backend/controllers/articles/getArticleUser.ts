import { prisma } from "../../libs/prisma";

const prismaUser = prisma.user;
const prismaArticle = prisma.article;

export async function getArticleUser(idUser: number) {
  if (!idUser) {
    return { status: 400, body: { msg: "Please enter id" } };
  }

  try {
    const user = await prismaUser.findUnique({
      where: {
        id: idUser,
      },
    });

    if (!user) {
      return { status: 400, body: { msg: "No user found" } };
    }

    const article = await prismaArticle.findMany({
      where: {
        userId: idUser,
      },
      select: {
        id: true,
        title: true,
        link: true,
        imgSrc: true,
      },
    });

    if (!article.length) {
      return { status: 200, body: { article: [], msg: "No article found" } };
    }
    return {
      status: 200,
      body: {
        article: article,
        msg: "User article found",
      },
    };
  } catch (error) {
    return { status: 500, body: { msg: error.message } };
  }
}
