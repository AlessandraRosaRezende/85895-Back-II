// const { verifyToken } = require('../utils/auth');
const passport = require("passport");

// const checkAuth = async(req, res, next) => {
//   const token = req.signedCookies.currentUser;
//   if (!token) return res.redirect('/users/login');
//   try {
//     req.user = verifyToken(token);
//     next();
//   } catch {
//     res.clearCookie('currentUser');
//     res.redirect('/users/login');
//   }
// }

const checkNotAuth = async(req, res, next) => {
  if (req.signedCookies.currentUser) {
    return res.redirect('/users/current');
  }
  next();
}

const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
      }
      req.user = user;
      next();
    })(req, res, next)
  }
}

module.exports = { checkNotAuth, passportCall };