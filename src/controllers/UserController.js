const { PrismaClient } = require("@prisma/client");
const validator = require("validator");
const authUtils = require("../authentication/utils");

const prisma = new PrismaClient();

const authenticateUser = async (req, res) => {
  const a;
  res.send(`user authenticated: ${req.isAuthenticated()}`);
};

const validateCreateUser = (email, password) => {
  const user = prisma.user.findFirst({
    data: {
      email,
    },
  });
  if (
    validator.isEmail(email) &&
    validator.isLength(password, { min: 8 } && !user)
  ) {
    return true;
  }
  return false;
};

const createUser = async (req, res) => {
  const { body } = req;
  if (validateCreateUser(body.email, body.password)) {
    const hashPassword = await authUtils.hashPassword(req.body.password);
    await prisma.user.create({
      data: {
        email: body.email,
        password: hashPassword,
      },
    });
    res.send("erm");
  } else {
    res.status(403).json({ message: "incorrect user info" });
  }
};

module.exports = {
  authenticateUser,
  createUser,
};
