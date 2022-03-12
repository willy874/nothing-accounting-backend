const authenticateUser = async (req, res) => {
  res.send(`user authenticated: ${req.isAuthenticated()}`);
};

module.exports = {
  authenticateUser,
};
