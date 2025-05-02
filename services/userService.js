const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/userRepository");

const register = async (data) => {
  const existingUser = await UserRepository.findByEmail(data.email);
  if (existingUser) {
    const error = new Error("Bu email zaten kayıtlı.");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await UserRepository.createUser({
    username: data.username,
    email: data.email,
    password: hashedPassword,
  });

  return { id: newUser._id, username: newUser.username, email: newUser.email };
};

const login = async (data) => {
  const user = await UserRepository.findByEmail(data.email);
  if (!user) {
    throw new Error("Kullanıcı bulunamadı.");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Parola hatalı.");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: { id: user._id, username: user.username, email: user.email },
  };
};

module.exports = { register, login };
