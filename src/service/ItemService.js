const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ItemService {
  static editItemFields = ["paymentTypeId", "transaction", "memo"];

  static createItemKeyArray = ["paymentTypeId", "transaction", "memo"];

  static createItemCategoryKeyArray = ["categoryId", "subcategoryId"];

  static async create(item, userId) {
    await this.createItem(item, 1);
  }

  static async edit(itemId, data) {
    const item = prisma.Item.update({
      where: {
        id: itemId,
      },
      data,
    });
    return item;
  }

  static createItem(item, userId) {
    console.log(this.createItemObject(item));
    return prisma.User.update({
      where: {
        id: userId,
      },
      data: {
        items: {
          create: this.createItemObject(item),
        },
      },
    });
  }

  static createItemObject(itemObject) {
    const itemObj = this.sortItemObj(itemObject);
    const itemcategory = this.sortItemCategoryArray(itemObject);
    if (Object.keys(itemcategory).length !== 0) {
      itemObj.itemCategory = {};
      itemObj.itemCategory.create = itemcategory;
    }
    console.log(itemObj, "heloooo");
    return itemObj;
  }

  static sortItemObj(itemObject) {
    const itemObj = { date: new Date(itemObject.date) };
    Object.entries(itemObject).forEach(([key, value]) => {
      if (this.createItemKeyArray.includes(key)) {
        itemObj[key] = value;
      }
    });
    return itemObj;
  }

  static sortItemCategoryArray(itemObject) {
    const itemCategoryObj = {};
    Object.entries(itemObject).forEach(([key, value]) => {
      if (this.createItemCategoryKeyArray.includes(key)) {
        itemCategoryObj[key] = value;
      }
    });
    return itemCategoryObj;
  }

  static async editItemObject(itemObj) {
    const item = await prisma.Item.findFirst({
      where: {
        id: itemObj.itemId,
      },
    });
    const itemObjKeys = Object.keys(itemObj);
    if (this.editItemFields.some((key) => itemObjKeys === key)) {
      return this.getItemArray(itemObj, item);
    }
    return item;
  }

  static getItemArray(itemObj, item) {
    const itemObject = itemObj;
    Object.entries(itemObj).itemObj.forEach(([key, value]) => {
      if (this.editItemFields.include(key)) {
        itemObject[key] = value;
      }
    });
    return itemObject;
  }
}

module.exports = {
  ItemService,
};
