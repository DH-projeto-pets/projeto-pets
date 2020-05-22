const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const { sequelize, User } = require("../models");

let UserController = {
  store: async (req, res) => {
    const { email, senha, nome, } = req.body;
    const usuario = await User.create({
      email,
      senha: bcrypt.hashSync(senha, 10),
      nome
    });
    res.send(req.body)

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
    const { email, senha } = req.body

    const usuario = await User.findOne({
      where: {
        email
      },
    }).then((u) => u);
    // falta validar se o usuario existe ou n
    if (!usuario) {
      res.redirect("/login?error=1");
    }
    // falta validar a senha
    if (!bcrypt.compareSync(senha, usuario.senha)) {
      res.redirect("/login?error=1");
    }
    // faz login aka salva o cooke
    req.session.user = usuario;

    return res.redirect("/");

  },
  show: (req, res) => {
    // consulta se o usuario existe
    res.render("screen/owner-profile");
  },
  getUser: (req, res) => {
    // mostra o perfil do proprio usuario usando o id que está no cookie
    return res.render("screen/owner-profile");
  },

  showUser: (req, res) => { },
  showGerenciamento: (req, res) => res.render("screen/manager-pet"),
  showUpdate: (req, res) => res.render("screen/edit-user"),
};

module.exports = UserController;
