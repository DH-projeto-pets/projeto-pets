//  Importando dotenv para pegar chave da API
require("dotenv").config();

const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { check, validationResult, body } = require("express-validator");
const { sequelize, User, Pet, Endereco } = require("../models");

const { costumizeErrors } = require("../helpers/utils");

// Importando pacote para usar com a API
const NodeGeocoder = require("node-geocoder");
// Configurações da API
const options = {
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
            tipo: "PF",
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
    console.log(errors, req.body, req.file);

    if (errors.isEmpty()) {
      const id = req.session.user.id;
      if (req.file) {
        var image = `/images/${req.file.originalname}`;
      }
      console.log("imageee", image);

        const { senha, novaSenha } = req.body
        const usuario = await User.findOne({
          where: {
            id
          },
        }).then((u) => u);

        console.log('senhaa', senha, novaSenha, usuario)
        if (!bcrypt.compareSync(senha, usuario.senha)) {
          return res.render("screen/edit-user", {
            errors: {
              senha: "Senha diferente da cadastrada",
            },
            usuario: {
              ...req.body,
              endereco:{...req.body}
            },
          });
        }
        else{

        req.body.novaSenha =  bcrypt.hashSync(req.body.novaSenha, 10);

          const usuario = await User.update(
            {
              ...req.body,
              image,
              senha: req.body.novaSenha
            },
            { where: { id } }
          );

        }
        const { nome } = await User.findOne({
          where: {
            id,
          },
        });

      // }

      // Adicionar endereço na tabela de endereços.

      let { cep, logradouro, numero, bairro, cidade, estado } = req.body;
      const [address] = await geocoder.geocode(
        `${logradouro} ${numero} ${cep} ${bairro} ${cidade} ${estado}`
      );
      const { latitude, longitude } = address;

      const hasAddress = await Endereco.findOne({
        where: {
          fk_usuario: id,
        },
      });
      if (hasAddress) {
        await Endereco.update(
          {
            cep,
            logradouro,
            numero,
            bairro,
            cidade,
            estado,
            latitude,
            longitude,
          },
          {
            where: {
              fk_usuario: id,
            },
          }
        );
      } else {
        await Endereco.create({
          cep,
          logradouro,
          numero,
          bairro,
          cidade,
          estado,
          latitude,
          longitude,
          fk_usuario: id,
        });
      }

      req.session.save(() => {
        req.session.user.nome = nome;
        return res.redirect("editar");
      });
    } else {
      const e = costumizeErrors(errors);
      return res.render("screen/edit-user", {
        errors: e,
        usuario: {
          ...req.body,
          endereco:{...req.body}
        },
      });
    }
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

    const usuario = await User.findOne({
      where: { id },
      include: [
        //"pets",
        {
          model: Pet,
          as: "pets",
          include: ["fotoPrincipal", "raca"],
        },
      ],
    });
    console.log(usuario);
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
      include: ["endereco"],
    });
    // console.log(usuario)
    res.render("screen/edit-user", { errors: {}, usuario });
  },
};

module.exports = UserController;
