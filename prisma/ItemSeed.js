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

  if (user) {
    await Promise.all(
      items.map(async (item) => {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            items: {
              create: [
                {
                  date: item.date,
                  transaction: "expense",
                },
              ],
            },
          },
        });
      })
    );
  }
  console.log(await prisma.item.findMany());
};

module.exports = {
  itemMain,
};
