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
          categoryItem: {
            create: {
              itemArray,
            },
          },
        },
      },
    });
  }

  static getAllItem(userId) {
    console.log('getAllItem')
  }


  static get(itemId) {
    return prisma.Item.findFirst({
      where: {
        id: itemId,
      },
    });
  }

  static async edit(itemId, itemData, userId) {
    // const item = prisma.Item.findFirst({
    //   where: {
    //     id: itemId,
    //   },
    // });
  }

  static delete(itemId) {
    console.log(itemId)
  }
}

module.exports = {
  ItemService,
};
