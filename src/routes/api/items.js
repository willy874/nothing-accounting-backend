const express = require("express");

const router = express.Router();

const ItemController = require("../../controllers/ItemController");
const IsAuthenticated = require("../../middleware/IsAuthenticated");


router.get(
  "/",
  // IsAuthenticated.isAuthenticated,
  ItemController.getItems
);

router.get(
  "/:itemId",
  // IsAuthenticated.isAuthenticated,
  ItemController.getItem
);

router.post(
  "/",
  IsAuthenticated.isAuthenticated,
  ItemController.createItem
);

router.put(
  "/:itemId",
  // IsAuthenticated.isAuthenticated,
  ItemController.updateItem
);

router.delete(
  "/:itemId",
  // IsAuthenticated.isAuthenticated,
  ItemController.deleteItem
);

module.exports = router;
