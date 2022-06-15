const { ItemService } = require("../service/ItemService");


const getItems = (req, res) => {
  let items = ItemService.getAllItem(req.user);
  console.log(items)
  res.send('getItems');
};

const getItem = (req, res) => {
  const itemId = req.params.itemId;
  ItemService.get(itemId);
  res.send(`getItem: ${itemId}`);
};

const createItem = (req, res) => {
  const { body } = req;
  ItemService.create(body, req.user);
};

const updateItem = (req, res) => {
  const { body } = req;
  const itemId = req.params.itemId;
  ItemService.edit(itemId, body);
  res.status(200).send(`update item: ${itemId}`);
};

const deleteItem = (req, res) => {
  const { body } = req;
  const itemId = req.params.itemId;
  ItemService.delete(itemId);
  res.status(204);
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};
