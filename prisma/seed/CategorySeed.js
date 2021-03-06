const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categoryList = [
  {
    name: "Home Appliance",
  },
];

const checkRequirement = async () => {
  const categoryFirst = await prisma.Category.findFirst({
    where: {
      id: 1,
    },
  });
  if (categoryFirst) {
    return true;
  }
  return false;
};

const categoryMain = async () => {
  if (!(await checkRequirement())) {
    await prisma.User.update({
      where: {
        id: 1,
      },
      data: {
        category: {
          create: categoryList,
        },
      },
    });
  }
  console.log("category created");
};

module.exports = {
  categoryMain,
};
