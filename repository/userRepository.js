const User = require("../models/User");

const createUser = async (data) => await User.create(data);
const findByEmail = async (email) => await User.findOne({ email });
const findByUsername = async (username) => await User.findOne({ username });

module.exports = {
  createUser,
  findByEmail,
  findByUsername,
};
