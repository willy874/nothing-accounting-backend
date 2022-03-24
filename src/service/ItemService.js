const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ItemService {
  static async create(itemArray, userId) {
    await prisma.User.update({
      where: {
        id: userId,
      },
      data: {
        items: {
          create: itemArray,
          categoryItem: itemArray,
        },
      },
    });
  }

  static async edit(itemId, userId) {
    // const item = prisma.Item.findFirst({
    //   where: {
    //     id: itemId,
    //   },
    // });
  }
}

module.exports = {
  ItemService,
};
