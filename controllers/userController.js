const UserService = require("../services/userService");

const register = async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await UserService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
