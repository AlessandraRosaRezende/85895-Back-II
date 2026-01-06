const usersService = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await usersService.getUsers();
    res.send({ status: "success", result: users });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    if (!user) return res.status(404).send({ status: "error", message: "User not found" });
    res.send({ status: "success", result: user });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const userCreated = await usersService.createUser(userData);
    res.status(201).send({ status: "success", result: userCreated });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const userUpdated = await usersService.updateUser(id, userData);
    res.send({ status: "success", result: userUpdated });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
