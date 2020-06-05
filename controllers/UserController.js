//  Importando dotenv para pegar chave da API
require("dotenv").config();

const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const { sequelize, User, Pet } = require("../models");

const { costumizeErrors } = require("../helpers/utils");

// Importando pacote para usar com a API
const NodeGeocoder = require("node-geocoder");
// Configurações da API
const options = {
  provider: "google",
  apiKey: process.env.API_KEY,
  formatter: null,
};
const geocoder = NodeGeocoder(options);

let UserController = {
  store: async (req, res) => {
    const { email, senha, nome } = req.body;
    const usuarioExiste = await User.findOne({
      where: {
        email,
      },
    }).then((u) => u);

    if (usuarioExiste) res.redirect("/cadastrar?error=1");

    const usuario = await User.create({
      email,
      senha: bcrypt.hashSync(senha, 10),
      nome,
    });
    res.send(req.body);
    // cria o user no db
  },
  // Uso da API
  update: async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors, req.body);
    // if (errors.isEmpty()) {
    const id = req.session.user.id;
    if (req.file) {
      var image = `/images/dinamics/${req.file.originalname}`;
    }
    const usuario = await User.update(
      {
        ...req.body,
        image,
      },
      { where: { id } }
    );

    const { nome } = await User.findOne({
      where: {
        id,
      },
    });
    req.session.save(() => {
      req.session.user.nome = nome;
      return res.redirect("/user/editar");
    });
    // }
    // res.render("screen/edit-user", { errors });
  },
  delete: (req, res) => {
    // deleta o usuario
  },
  login: async (req, res) => {
    const errors = validationResult(req);
    console.log(errors, errors.isEmpty());
    if (errors.isEmpty()) {
      const { email, senha } = req.body;
      const usuario = await User.findOne({
        where: {
          email,
        },
      }).then((u) => u);

      // falta validar se o usuario existe ou n
      if (!usuario) {
        // res.redirect("/login?error=1");
        res.render("screen/login", {
          errors: {
            email: "Email inválido",
            senha: "Senha inválida",
          },
          usuario: {
            ...req.body,
          },
        });
      }
      // falta validar a senha
      if (!bcrypt.compareSync(senha, usuario.senha)) {
        res.render("screen/login", {
          errors: {
            email: "Email inválido",
            senha: "Senha inválida",
          },
          usuario: {
            ...req.body,
          },
        });
      }
      // faz login aka salva o cooke
      req.session.user = usuario;

      return res.redirect("/");
    }
    const e = costumizeErrors(errors);
    res.render("screen/login", {
      errors: e,
      usuario: {
        ...req.body,
      },
    });
  },
  show: async (req, res) => {
    const { id } = req.params;

    const usuario = await User.findOne({ where: { id }, include: ["pets"] });
    // console.log(user)
    if (!usuario) return res.render("404-not-found");
    res.render("screen/owner-profile", { usuario });
  },
  showGerenciamento: async (req, res) => {
    const { id } = req.session.user;

    const user = await User.findOne({
      where: { id },
      include: [
        // "pets",
        {
          model: Pet,
          as: "pets",
          include: "fotoPrincipal",
        },
      ],
    });

    res.render("screen/manager-pet", { pets: user.pets });
  },
  showUpdate: async (req, res) => {
    const usuario = await User.findOne({
      where: {
        id: req.session.user.id,
      },
    });
    // console.log(usuario)
    res.render("screen/edit-user", { usuario });
  },
};

module.exports = UserController;
