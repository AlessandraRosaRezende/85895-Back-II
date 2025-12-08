const express = require('express');
const { showLogin, showCurrent, showRegister } = require('../controllers/views.controller');
const { checkAuth, checkNotAuth } = require('../middlewares/auth.middleware');
const { register } = require('../controllers/user.controller');
const router = express.Router();

router.get('/login', checkNotAuth, showLogin);
router.get('/current', checkAuth, showCurrent);
router.get('/register', checkNotAuth, showRegister);
router.post('/register', register);

module.exports = router;
