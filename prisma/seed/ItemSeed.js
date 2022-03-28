const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const items = [
  {
    date: new Date(),
    transaction: "expense",
  },
];

const checkRequirement = async () => {
  //
  const category = await prisma.Category.findFirst({
    where: {
      id: 1,
    },
  });

  const user = await prisma.User.findFirst({
    where: {
      id: 1,
    },
  });
  if (!category && user) {
    return true;
  }
  return false;
};

const itemMain = async () => {
  if (checkRequirement()) {
    await Promise.all(
      items.map(async (item) => {
        await prisma.user.update({
          where: {
            id: 1,
          },
          data: {
            items: {
              create: [
                {
                  date: item.date,
                  transaction: "expense",
                  itemCategory: {
                    create: {
                      categoryId: 1,
                      subcategoryId: 1,
                    },
                  },
                },
              ],
            },
          },
        });
      })
    );
  }
  console.log("item created");
};

module.exports = {
  itemMain,
};
