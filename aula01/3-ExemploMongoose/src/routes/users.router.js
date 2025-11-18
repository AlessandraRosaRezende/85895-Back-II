const { Router } = require('express');
const usersController = require('../controllers/users.controller')

const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsers)
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);

module.exports = usersRouter;