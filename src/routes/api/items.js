const express = require("express");

const router = express.Router();

const ItemController = require("../../controllers/ItemController");
// const IsAuthenticated = require("../../middleware/IsAuthenticated");

router.post(
  "/create",
  // IsAuthenticated.isAuthenticated,
  ItemController.createItem
);

router.patch(
  "/edit/:id",
  // IsAuthenticated.isAuthenticated,
  ItemController.editItem
);

module.exports = router;
