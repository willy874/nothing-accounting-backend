const {UserService} = require('../service/UserService')

const authenticateUser = async (req, res) => {
  res.send(`user authenticated: ${req.isAuthenticated()}`);
};

const createUser = async (req, res) => {
  const { body } = req;
  if (UserService.createUser(body.email, body.password)) {
    res.json({message: 'user created'});
  } else {
    res.status(403).json({ message: "incorrect user info" });
  }
};

module.exports = {
  authenticateUser,
  createUser,
};
