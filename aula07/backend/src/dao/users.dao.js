const userModel = require("../models/users.model");

const getUsers = async () => {
  const users = await userModel.find();
  return users;
}

const getUserById = async (id) => {
  const user = await userModel.findById(id);
  return user;
}

const createUser = async (userData) => {
  const newUser = await userModel.create(userData);
  return newUser;
}

const updateUser = async (id, userData) => {
  const updatedUser = await userModel.findOneAndUpdate(id, { $set: userData }, { new: true });
  return updatedUser;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};