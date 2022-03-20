const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ItemService {
  static async createItems(itemArray, userId) {
    await prisma.User.update({
      where: {
        id: userId,
      },
      data: {
        items: {
          create: itemArray,
        },
      },
    });
  }
}

module.exports = {
  ItemService,
};
