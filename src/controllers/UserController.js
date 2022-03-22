const { UserService } = require("../service/UserService");

const authenticateUser = async (req, res, next) => {
  res.send(`user authenticated: ${req.isAuthenticated()}`);
};

const createUser = async (req, res) => {
  const { body } = req;
  if (await UserService.create(body.email, body.password)) {
    res.json({ message: "user created" });
  } else {
    res.status(403).json({ message: "incorrect user info" });
  }
};

const getUsers = async (req, res) => {
  return res.json({ hello: "hello" });
};

module.exports = {
  authenticateUser,
  createUser,
  getUsers,
};
