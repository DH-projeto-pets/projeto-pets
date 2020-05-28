const { sequelize, Pet } = require('../models');

module.exports = {
  auth: async (req, res) => {
    // se estiiver logado vai pra home.ejs e se nao vai index
    const pets = await Pet.findAll()

    return res.render('screen/home', { pets })
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