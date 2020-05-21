const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const { sequelize, User } = require("../models");

let UserController = {
  store: (req, res) => {
    // cria o user no db
  },
  update: (req, res) => {
    // altera o usuario
  },
  delete: (req, res) => {
    // deleta o usuario
  },
  login: async (req, res) => {
    // console.log(req.body);

    const usuario = await User.findOne({
      where: {
        ...req.body,
      },
    }).then((u) => u);
    // falta validar se o usuario existe ou n
    // falta validar a senha
    console.log("usuario", usuario);
    req.session.user = usuario;

    return res.redirect("/");

    // faz login aka salva o cooke
  },
  show: (req, res) => {
    // consulta se o usuario existe
    res.render("screen/owner-profile");
  },
  getUser: (req, res) => {
    // mostra o perfil do proprio usuario usando o id que está no cookie
    return res.render("screen/owner-profile");
  },

  showUser: (req, res) => {},
  showGerenciamento: (req, res) => res.render("screen/manager-pet"),
  showUpdate: (req, res) => res.render("screen/edit-user"),
};

module.exports = UserController;
