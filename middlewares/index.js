const { Pet } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  checkUser: async (req, res, next) => {
    const pets  = await Pet.findAll(
      {
      limit: 3
    },
    {
      where: {
        [Op.or]: [
          { status: 'PERDIDO' },
          { status: 'ENCONTRADO' },
        ]
      },
    order: [
      ['id', 'DESC']
    ]
    });

    const petsAdocao  = await Pet.findAll(
      {
      limit: 3
    },
    {
      where: {
        [Op.or]: [
          { status: 'ADOCAO' }
        ]
      },
    order: [
      ['id', 'DESC']
    ]
    });

    if (!req.session.user) return res.render("index", {pets, petsAdocao});
    return next();
  },
  checkUserLogado: (req, res, next) => {
    if (req.session.user) return res.redirect("/");
    return next();
  },
  setUser: (req, res, next) => {
    if (req.session.user) res.locals.user = req.session.user;
    return next();  
  },
  // checkUserDB: (req, res, next) => {
  //   const { email, senha } = req.body
  // }
};
