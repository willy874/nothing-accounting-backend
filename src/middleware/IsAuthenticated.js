const addIsAuthenticated = (req, res, next) => {
  req.session.loggedIn = true;
  req.session.username = req.user;
  next();
};
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    req.isAuthenticated();
    next();
  } else {
    res.status(403).json({ message: "Not Authorized" });
  }
};

module.exports = {
  addIsAuthenticated,
  isAuthenticated,
};
