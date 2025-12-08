const userService = require('../services/user.service');

const showLogin = async(req, res) => {
  const error = req.query.error;
  res.render('login', { error });
}

const showCurrent = async(req, res) => {
  const user = await userService.findById(req.user.id);
  if (!user) return res.status(404).send('User not found');
  res.render('current', { user });
}

const showRegister = async(req, res) => {
  const error = req.query.error;
  res.render('register', { error });
}

module.exports = { showLogin, showCurrent, showRegister };
