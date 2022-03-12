// import { genSalt, hash, compare } from "bcrypt";
const bycrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  return bycrypt.hash(password, salt);
};

const comparePassword = async (hashedPassword, password) =>
  bycrypt.compare(password, hashedPassword);

module.exports = {
  hashPassword,
  comparePassword,
};
