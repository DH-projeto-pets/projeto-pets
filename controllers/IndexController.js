module.exports = {
  auth: (req, res) => {
    // se estiiver logado vai pra home.ejs e se nao vai index
    return res.render('screen/home')
  },
  logout: (req, res) => {
    req.session.destroy(() => {
      return res.redirect("/");
    });
  },
  showLogin: (req, res) => res.render('screen/login'),
  showRegister: (req, res) => res.render('screen/register-user'),
  //showRecover: (req, res) => res.render(),
  showAbout: (req, res) => res.render('screen/about'),
  showTerms: (req, res) => res.render('screen/terms-of-use'),
};