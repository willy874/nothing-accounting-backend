// import { genSalt, hash, compare } from "bcrypt";
const bycrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hashPassword = await bycrypt.hash(password, salt);
  return hashPassword
};

const comparePassword = async (hashedPassword, password) =>
  bycrypt.compare(password, hashedPassword);

module.exports = {
  hashPassword,
  comparePassword,
};
