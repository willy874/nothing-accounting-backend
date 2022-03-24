const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const subcategoryArray = [
  {
    name: "Furniture",
  },
];

const checkRequirements = async () => {
  const category = await prisma.Category.findFirst({
    where: {
      id: 1,
    },
  });
  if (category) {
    return true;
  }
  return false;
};

const subcategoryMain = async () => {
  if (await checkRequirements()) {
    await prisma.category.update({
      where: {
        id: 1,
      },
      data: {
        subcategory: {
          create: subcategoryArray,
        },
      },
    });
  }
  console.log("subcategory created");
};

module.exports = {
  subcategoryMain,
};
