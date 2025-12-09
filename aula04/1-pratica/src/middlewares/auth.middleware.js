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
      const userInfo = {
        id: user._id,
        email: user.email,
        role: user.role,
      }
      req.user = userInfo;
      next();
    })(req, res, next)
  }
}

const authorization = (role) => {
  return async (req, res, next) => {
    console.log(req.user);
    if (!req.user) return res.status(401).send({ error: "Unauthorized" })
    if (req.user.role != role) {
      console.log(req.user.role);
      console.log(role);
      return res.status(403).send({ error: "No permission" })
    }
    next()
  }
}

module.exports = { checkNotAuth, passportCall, authorization };