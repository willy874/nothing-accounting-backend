const { ItemService } = require("../service/ItemService");

const createItem = (req, res) => {
  const { body } = req;
  ItemService.create(body, req.user);
};

module.exports = {
  createItem,
};
