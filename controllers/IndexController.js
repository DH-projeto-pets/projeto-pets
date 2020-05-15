module.exports = {
  auth: (req, res) => {
    // se estiiver logado vai pra home.ejs e se nao vai index
  },
  showLogin: (req, res) => res.render('screen/login'),
  showRegister: (req, res) => res.render('screen/register-user'),
  //showRecover: (req, res) => res.render(),
  showAbout: (req, res) => res.render('screen/about'),
  showTerms: (req, res) => res.render('screen/terms-of-use'),
};