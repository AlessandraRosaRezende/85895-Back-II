const usersDao = require('../dao/users.dao');

const getUsers = async () => {
  return await usersDao.getUsers();
};

const getUserById = async (id) => {
  return await usersDao.getUserById(id);
};

const createUser = async (user) => {
  return await usersDao.createUser(user);
};

const updateUser = async (id, user) => {
  return await usersDao.updateUser(id, user);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser
};
