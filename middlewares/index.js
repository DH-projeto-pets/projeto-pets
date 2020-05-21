module.exports = {
  checkUser: (req, res, next) => {
    if (!req.session.user) return res.render("index");
    return next();
  },
  checkUserLogado: (req, res, next) => {
    if (req.session.user) return res.redirect("/");
    return next();
  },
};
