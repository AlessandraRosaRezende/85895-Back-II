const { verifyToken } = require('../utils/auth');

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

module.exports = { checkNotAuth };