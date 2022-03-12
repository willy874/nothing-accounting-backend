const express = require("express");
const passport = require("passport");
const UserController = require("../controllers/UserController");

const router = express.Router();

/* GET users listing. */
// router.get("/", (req, res, next) => {
//   res.send("respond with a resource");
// });

router.post(
  "/login",
  passport.authenticate("local"),
  UserController.authenticateUser
);

router.post("/create", UserController.createUser);

module.exports = router;
