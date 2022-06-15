const express = require("express");
const passport = require("passport");
const UserController = require("../../controllers/UserController");
const IsAuthenticated = require("../../middleware/IsAuthenticated");

const router = express.Router();


router.get("", IsAuthenticated.jwtAuthenticated, UserController.getUsers);
router.post("/create", UserController.createUser);
router.post(
  "/login",
  UserController.loginUser
);

module.exports = router;
