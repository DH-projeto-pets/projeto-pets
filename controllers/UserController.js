const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const { sequelize, User } = require("../models");

let UserController = {
  store: async (req, res) => {
    const { email, senha, nome, } = req.body;
    const usuarioExiste = await User.findOne({
      where: {
        email
      },
    }).then((u) => u);

    if (usuarioExiste) res.redirect("/cadastrar?error=1");

    const usuario = await User.create({
      email,
      senha: bcrypt.hashSync(senha, 10),
      nome
    });
    res.send(req.body)

    // cria o user no db
  },
  update: async (req, res) => {
    const id = req.session.user.id;
    const usuario = await User.update({
      ...req.body
    },
      { where: { id } },
    );

    const { nome } = await User.findOne({
      where: {
        id
      },
    });

    req.session.save(() => {
      req.session.user.nome = nome;
      return res.redirect("/user/editar");
    })
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

  showGerenciamento: (req, res) => res.render("screen/manager-pet"),
  showUpdate: async (req, res) => {

    const usuario = await User.findOne({
      where: {
        id: req.session.user.id,
      }
    })
    // console.log(usuario)
    res.render("screen/edit-user", { usuario });
  },
};

module.exports = UserController;
