import jwt from 'jsonwebtoken';


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

const jwtAuthenticated = (req, res, next) => {
  const bearerToken = req.headers.authorization
  if (bearerToken) {
    const token = bearerToken.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        res.status(401).json({ message: "Not Authorized" });
      } else {
        req.jwtPayload = payload
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = {
  addIsAuthenticated,
  isAuthenticated,
  jwtAuthenticated
};
