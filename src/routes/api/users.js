const express = require("express");
const passport = require("passport");
const UserController = require("../../controllers/UserController");
const IsAuthenticated = require("../../middleware/IsAuthenticated");

const router = express.Router();

/* GET users listing. */
// router.get("/", (req, res, next) => {
//   res.send("respond with a resource");
// });

router.post("/create", UserController.createUser);
router.post(
  "/login",
  passport.authenticate("local"),
  UserController.authenticateUser
);

router.get("/users", IsAuthenticated.isAuthenticated, UserController.getUsers);

module.exports = router;
