const { ItemService } = require("../service/ItemService");

const createItem = (req, res) => {
  const { body } = req;
  ItemService.createItems(body, req.user);
};

module.exports = {
  createItem,
};
