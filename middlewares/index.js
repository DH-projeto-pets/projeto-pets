const { Pet } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  checkUser: async (req, res, next) => {
    let pets = await Pet.findAll({
      where: {
        [Op.or]: [{ status: "PERDIDO" }, { status: "ENCONTRADO" }],
      },
      include: "fotoPrincipal",
      order: [["id", "DESC"]],
    });
    let petsAdocao = await Pet.findAll({
      where: {
        [Op.and]: [{ status: "ADOCAO" }],
      },
      include: "fotoPrincipal",
      order: [["id", "DESC"]],
    });
    pets = pets.slice(0, 4);
    petsAdocao = petsAdocao.slice(0, 4);
    if (!req.session.user) return res.render("index", { pets, petsAdocao });
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
