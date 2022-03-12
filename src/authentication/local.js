const PrismaClient = require("@prisma/client");
const passportLocal = require("passport-local");
const passport = require("passport");
const authUtils = require("./utils");

const prisma = new PrismaClient.PrismaClient();
const { Strategy } = passportLocal;

const loginOptions = {
  usernameField: "email",
  passwordField: "password",
};

const passportInit = () => {
  passport.use(
    new Strategy(loginOptions, async (email, password, done) => {
      const user = await prisma.User.findFirst({
        where: {
          email,
        },
      });

      if (user) {
        if (await authUtils.comparePassword(user.password, password)) {
          return done(null, user);
        }
        return done(null, false, {
          message: "incorrect password",
        });
      }
      return done(null, false, {
        message: "no user found",
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const user = prisma.User.findFirst({
      where: {
        id,
      },
    });
    return done(null, user);
  });
};

module.exports = {
  passportInit,
};
