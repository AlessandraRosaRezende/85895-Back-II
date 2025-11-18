const usersService = require("../services/users.service");

const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsers();
  if (users.length === 0) {
    return res.json({ message: 'Não tem usuário cadastrado'})
  }
  return res.json(users)
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
}

const createUser = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const newUser = await usersService.createUser({ first_name, last_name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const updatedUser = await usersService.updateUser(id, { email });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await usersService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}