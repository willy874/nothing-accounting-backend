const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const items = [
  {
    date: new Date(),
    transaction: "expense",
  },
];

const itemMain = async () => {
  const user = await prisma.User.findFirst({
    where: {
      id: 1,
    },
  });

  if (!user) {
    items.forEach(async (item) => {
      await prisma.Item.create({
        data: {
          user_id: user.id,
          date: item.date,
          transaction: "expense",
        },
      });
    });
  }
};

module.exports = {
  itemMain,
};
