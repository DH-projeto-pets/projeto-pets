//  Importando dotenv para pegar chave da API
require("dotenv").config();

const { sequelize, Pet, Foto } = require("../models");
const { Op } = require("sequelize");
const { check, validationResult, body } = require("express-validator");
const { costumizeErrors } = require("../helpers/utils");

// Importando pacote para usar com a API
const NodeGeocoder = require("node-geocoder");
// Configurações da API
const options = {
  provider: "google",
  apiKey: process.env.API_KEY,
  formatter: null,
};
// Chamando API
const geocoder = NodeGeocoder(options);

module.exports = {
  showGrid: async (req, res) => {
    let { page = 1 } = req.query;
    const { count: total, rows: pets } = await Pet.findAndCountAll(
      {
        limit: 6,
        offset: (page - 1) * 6,
      },
      {
        where: {
          [Op.or]: [{ status: "PERDIDO" }, { status: "ENCONTRADO" }],
        },
        order: [["id", "DESC"]],
      }
    );
    let totalPagina = Math.ceil(total / 6);
    res.render("screen/lost-found-pets", { pets, totalPagina });
  },
  showGridAdocao: async (req, res) => {
    let { page = 1 } = req.query;
    const { count: total, rows: petsAdocao } = await Pet.findAndCountAll(
      {
        limit: 6,
        offset: (page - 1) * 6,
      },
      {
        where: {
          [Op.or]: "ADOCAO",
        },
        order: [["id", "DESC"]],
      }
    );
    let totalPagina = Math.ceil(total / 6);
    res.render("screen/adoption-pets", { petsAdocao, totalPagina });
  },
  showPetPerfil: async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findOne({
      where: {
        id,
      },
      include: ["raca"],
    });
    res.render("screen/lost-found-pets-profile", { pet });
  },
  showPetCadastro: (req, res) => res.render("screen/register-lost-found-pets", { errors: {}, pet: {} }),
  showPetEdicao: async (req, res) => {
    const pet = await Pet.findOne({
      where: {
        [Op.or]: [{ status: "ENCONTRADO" }, { status: "PERDIDO" }],
        [Op.and]: [{ id: req.params.id }, { fk_usuario: req.session.user.id }],
      },
    });
    console.log(pet);
    res.render("screen/edit-lost-found-pets", { pet });
  },

  showPetCadastroAdocao: (req, res) =>
    res.render("screen/register-adopted-pets", { errors: {}, pet: {} }),
  showPetEdicaoAdocao: async (req, res) => {
    const pet = await Pet.findOne({
      where: {
        [Op.and]: [
          { fk_usuario: req.session.user.id },
          { id: req.params.id },
          { status: "ADOCAO" },
        ],
      },
    });
    console.log(pet);
    res.render("screen/edit-adopted-pets", { pet });
  }, // Rose

  // controla o banco

  update: async (req, res) => {
    const pet = await Pet.update(
      {
        ...req.body,
      },
      { where: { id: req.params.id } }
    );
    return res.redirect("/user/gerenciamento");
  },

  store: async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    if (errors.isEmpty()) {
      const pet = await Pet.create({
        ...req.body,
        fk_usuario: req.session.user.id,
        fk_raca: req.body.raca,
      })
        .then((pet) => pet)
        .catch((err) => err);
      console.log("==>", pet);

      // if (pet) {
      //   // const images = req.files.map((file) => `/images/${file.originalname}`);
      //   // await Foto.bulkCreate(images);
      //   console.log(images);
      //   for (img of images) {
      //     await Foto.create({
      //       caminho: img,
      //       fk_pet: pet.id,
      //     });
      //   }
      //   const [caminho] = images;
      //   const foto = await Foto.findOne({
      //     where: {
      //       caminho,
      //     },
      //   });
      //   await Pet.update(
      //     {
      //       fk_foto_principal: foto.id,
      //     },
      //     { where: { id: pet.id } }
      //   );
      // }
      res.redirect("/user/gerenciamento");
  }
  const e = costumizeErrors(errors);
  res.render("screen/register-lost-found-pets", {errors:e, pet: {...req.body} })
  },
  delete: async (req, res) => {
    const { id: petId } = req.body;
    const { id: userId } = req.session.user;
    const pet = await Pet.destroy({
      where: {
        [Op.and]: [{ id: petId }, { fk_usuario: userId }],
      },
    });

    res.redirect("/user/gerenciamento");
  },
};
