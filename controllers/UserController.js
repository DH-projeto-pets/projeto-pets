//  Importando dotenv para pegar chave da API
require("dotenv").config();

const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
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
    const errors = validationResult(req);
    console.log(errors, errors.isEmpty());

    if (errors.isEmpty()) {
      const { email, senha, nome, confirmar_senha } = req.body;

      const usuario = await User.findOne({
        where: {
          email,
        },
      }).then((u) => u);
      console.log(usuario);

      //Validar se usuário já existe
      if (usuario) {
        // res.redirect("/cadastrar?error=1");
        res.render("screen/register-user", {
          errors: {
            email: "Email já utilizado",
          },
          usuario: {
            ...req.body,
          },
        });

        console.log(errors);
      } else {
        const usuario = await User.create({
          email,
          senha: bcrypt.hashSync(senha, 10),
          nome,
        });
        res.render("screen/login", {
          errors: {},
          usuario: { email: usuario.email },
        });
        // cria o user no db
      }
    }

    const e = costumizeErrors(errors);
    res.render("screen/register-user", {
      errors: e,
      usuario: {
        ...req.body,
      },
    });
  },
  // Uso da API
  update: async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors, req.body);

    if (errors.isEmpty()) {
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
        res.render("screen/edit-user", usuario);
      });
    }
    const e = costumizeErrors(errors);
    res.render("screen/edit-user", {
      errors: e,
      usuario: {
        ...req.body,
      },
    });
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
    const { page = 1, status } = req.query;
    let { count: total, rows: pets } = await Pet.findAndCountAll({
      where: {
        [Op.and]: [{ fk_usuario: id }, status && { status }],
      },
      include: ["fotoPrincipal"],
    });
    console.log(pets.length, total, (page - 1) * 6, 6 * page);
    pets = pets.slice((page - 1) * 6, 6 * page);
    const totalPagina = Math.ceil(total / 6);
    res.render("screen/manager-pet", {
      pets,
      status,
      totalPagina,
    });
  },
  showUpdate: async (req, res) => {
    const usuario = await User.findOne({
      where: {
        id: req.session.user.id,
      },
    });
    // console.log(usuario)
    res.render("screen/edit-user", { errors: {}, usuario });
  },
  a: () => {
    const total = sequelize.query(
      "SELECT count(`Pet`.`id`) AS `count` FROM `pets` AS `Pet` LEFT OUTER JOIN `fotos` AS `fotoPrincipal` ON `Pet`.`fk_foto_principal` = `fotoPrincipal`.`id` WHERE (`Pet`.`fk_usuario` = (:id));",
      { replacements: { id }, model: Pet, mapToModel: true }
    );
    const pets = sequelize.query(
      "SELECT `Pet`.`id`, `Pet`.`nome`, `Pet`.`porte`, `Pet`.`sexo`, `Pet`.`status`, `Pet`.`descricao`, `Pet`.`vacinado`, `Pet`.`castrado`, `Pet`.`vermifugado`, `Pet`.`cuidados_extras`, `Pet`.`fk_raca`, `Pet`.`fk_usuario`, `Pet`.`fk_foto_principal`, `Pet`.`createdAt`, `Pet`.`updatedAt`, `fotoPrincipal`.`id` AS `fotoPrincipal.id`, `fotoPrincipal`.`caminho` AS `fotoPrincipal.caminho`, `fotoPrincipal`.`fk_pet` AS `fotoPrincipal.fk_pet` FROM `pets` AS `Pet` LEFT OUTER JOIN `fotos` AS `fotoPrincipal` ON `Pet`.`fk_foto_principal` = `fotoPrincipal`.`id` WHERE (`Pet`.`fk_usuario` = (:id)) LIMIT 0, (:id",
      { replacements: { id }, model: Pet, mapToModel: true }
    );
  },
};

module.exports = UserController;
