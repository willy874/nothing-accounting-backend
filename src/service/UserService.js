const { PrismaClient } = require("@prisma/client");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const authUtils = require("../authentication/utils");

const prisma = new PrismaClient();

class UserService {
  static async create(email, password) {
    if (!(await this.validateCreate(email, password))) {
      return false;
    }

    const hashPassword = await authUtils.hashPassword(password);

    let result = await prisma.user.create({
      data: {
        email,
        password: hashPassword
      },
    });
    return true;
  }

  static async validateCreate(email, password) {
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

  static async findUser(email, password) {
    const user = await prisma.user.findFirst({
      where: {
        email
      },
    });
    if (user) {
      if (await authUtils.comparePassword(user.password, `${password}`)) {
        return user;
      } else {
        return null
      }
    }
    return null;
  }

  static async getUser(email) {
    return await prisma.user.findFirst({
      where: {
        email
      },
    });
  }

  static createJwt(user) {
    const payload = {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    }

    return jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 3 * 60 * 60 * 1000 }
    );
  }
}

module.exports = {
  UserService,
};
