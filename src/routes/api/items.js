const express = require("express");

const router = express.Router();

const ItemController = require("../../controllers/ItemController");

router.post("/create", ItemController.createItem);

module.exports = router;
