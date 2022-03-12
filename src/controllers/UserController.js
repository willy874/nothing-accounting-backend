const PrismaClient = require("@prisma/client");
const passport = require("passport");

const prisma = new PrismaClient.PrismaClient();

const authenticateUser = (req, res) => {
  const a = passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);
  })(req, res);
  res.send("hello");
};

module.exports = {
  authenticateUser,
};
