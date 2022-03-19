const PrismaClient = require("@prisma/client");
const { userMain } = require("./UserSeed");
const { itemMain } = require("./ItemSeed");

const prisma = new PrismaClient.PrismaClient();

const main = async () => {
  await userMain();
  await itemMain();
};

main()
  .catch((error) => console.log("You have error", error))
  .finally(() => prisma.$disconnect);
