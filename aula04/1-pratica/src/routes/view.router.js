const express = require('express');
const { showLogin, showCurrent, showRegister } = require('../controllers/views.controller');
const { checkNotAuth, passportCall, authorization } = require('../middlewares/auth.middleware');
const { register } = require('../controllers/user.controller');
const passport = require('passport');
const router = express.Router();

router.get('/login', checkNotAuth, showLogin);
router.get('/register', checkNotAuth, showRegister);
router.post('/register', register);
// router.get('/current', checkAuth, showCurrent);
// router.get('/current', passport.authenticate('jwt', { session: false, failureRedirect: '/users/login' }), showCurrent);
// router.get('/current', passport.authenticate('jwt', { session: false }), showCurrent);
router.get('/current', passportCall('jwt'), authorization('admin'), showCurrent);

module.exports = router;
