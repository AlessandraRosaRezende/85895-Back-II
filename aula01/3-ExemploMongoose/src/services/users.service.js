const userModel = require("../models/user.model");

const getAllUsers = async () => {
  const users = await userModel.find().lean();
  return users;
}

const getUserById = async (id) => {
  const user = await userModel.findById(id).lean();
  return user;
}

const createUser = async (userData) => {
  const newUser = await userModel.create(userData);
  return newUser
}

const updateUser = async (id, userData) => {
  const userUpdated = await userModel.findByIdAndUpdate(id, userData, { new: true }).lean();
  return userUpdated;
}

const deleteUser = async (id) => {
  const userDeleted = await userModel.findByIdAndDelete(id);
  return userDeleted;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};