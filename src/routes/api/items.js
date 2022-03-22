const express = require("express");

const router = express.Router();

const ItemController = require("../../controllers/ItemController");
const IsAuthenticated = require("../../middleware/IsAuthenticated");

router.post(
  "/create",
  IsAuthenticated.isAuthenticated,
  ItemController.createItem
);

module.exports = router;
