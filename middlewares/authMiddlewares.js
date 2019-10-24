const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};
const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};
/* const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/");
  }
  next();
}; */

module.exports = { isLoggedIn, isNotLoggedIn };
