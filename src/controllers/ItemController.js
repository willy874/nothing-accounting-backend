const { ItemService } = require("../service/ItemService");

const createItem = (req, res) => {
  const { body } = req;
  // ItemService.create(body, req.user);
  ItemService.create(body, 1);
  res.json({ Message: "Completed" });
};

const editItem = (req, res) => {
  ItemService.edit(req.params.id, req.body);
  res.json({ Message: "updated" });
};

module.exports = {
  editItem,
  createItem,
};
