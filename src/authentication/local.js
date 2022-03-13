const PrismaClient = require("@prisma/client");
const passportLocal = require("passport-local");
const passport = require("passport");
const authUtils = require("./utils");

const prisma = new PrismaClient.PrismaClient();
const { Strategy } = passportLocal;


const newpassportStrategy = () => {

  const loginOptions = {
    usernameField: "email",
    passwordField: "password",
  };

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

}

const passportSerializeUser = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

}

const passportDeserializeUser = () => {

  passport.deserializeUser((id, done) => {
    const user = prisma.User.findFirst({
      where: {
        id,
      },
    });
    return done(null, user);
  });

}

const passportInit = () => {

  newpassportStrategy()
  passportSerializeUser()
  passportDeserializeUser()

};

module.exports = {
  passportInit,
};
