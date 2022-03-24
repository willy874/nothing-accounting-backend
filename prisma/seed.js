const { PrismaClient } = require("@prisma/client");
const { userMain } = require("./seed/UserSeed");
const { itemMain } = require("./seed/ItemSeed");
const { categoryMain } = require("./seed/CategorySeed");
const { subcategoryMain } = require("./seed/SubcategorySeed");

const prisma = new PrismaClient();

const main = async () => {
  await userMain();
  await categoryMain();
  await subcategoryMain();
  await itemMain();
};

main()
  .catch((error) => console.log("You have error", error))
  .finally(() => prisma.$disconnect);
