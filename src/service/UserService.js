const { PrismaClient } = require("@prisma/client");
const validator = require("validator");
const authUtils = require("../authentication/utils");

const prisma = new PrismaClient();

class UserService {
  static async createUser(email, password) {
    if (!(await this.validateCreateUser(email, password))) {
      return false;
    }

    const hashPassword = await authUtils.hashPassword(password);
    await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });
    return true;
  }

  static async validateCreateUser(email, password) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const isEmail = validator.isEmail(email);
    const isLength = validator.isLength(password, { min: 8 });
    if (isEmail && isLength && !user) {
      return true;
    }
    return false;
  }
}

module.exports = {
  UserService,
};
