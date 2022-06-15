const { UserService } = require("../service/UserService");

const authenticateUser = async (req, res, next) => {
  res.send(`user authenticated: ${req.isAuthenticated()}`);
};

const createUser = async (req, res) => {
  const { body } = req;
  if (await UserService.create(body.email, body.password)) {
    res.status(201).json({ message: "user created" });
  } else {
    res.status(403).json({ message: "incorrect user info" });
  }
};

const loginUser = async (req, res) => {
  const { body } = req;
  const user = await UserService.findUser(body.email, body.password)
  if (user) {
    res.status(200).json({ token: UserService.createJwt(user) });
  } else {
    res.status(401).json({ message: "incorrect user info" });
  }
}

const getUsers = async (req, res) => {
  const { email } = req.jwtPayload;
  const user = await UserService.getUser(email)
  return res.status(200).json({
    eamil: user.email,
    name: user.name,
    createdAt: user.createdAt
  })
};

module.exports = {
  authenticateUser,
  createUser,
  getUsers,
  loginUser
};
