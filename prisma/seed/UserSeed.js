const PrismaClient = require("@prisma/client");
const authUtils = require("../../src/authentication/utils");

const prisma = new PrismaClient.PrismaClient();

const users = [
  {
    email: "admin@gmail.com",
    name: "admin",
    password: "iampassword",
  },
];

const userMain = async () => {
  await Promise.all(
    users.map(async (user) => {
      const newUser = user;
      newUser.password = await authUtils.hashPassword(user.password);
      const existingUser = await prisma.User.findFirst({
        where: {
          email: user.email,
        },
      });
      if (!existingUser) {
        await prisma.User.create({ data: newUser });
      }
    })
  );
};

module.exports = {
  userMain,
};
