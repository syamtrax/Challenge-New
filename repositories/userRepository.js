const { User } = require("../models");

async function addUser(user) {
  return await User.create(user);
}

async function getUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

module.exports = {
  addUser,
  getUserByEmail,
};
