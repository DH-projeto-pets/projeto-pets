//  Importando dotenv para pegar chave da API
require("dotenv").config();

const { sequelize, Pet, Foto, Raca, User } = require("../models");
const { Op } = require("sequelize");

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
  showPetCadastro: (req, res) => res.render("screen/register-lost-found-pets"),
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
    res.render("screen/register-adopted-pets"),
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
    console.log(req.body);

    const pet = await Pet.create({
      ...req.body,
      fk_usuario: req.session.user.id,
      fk_raca: req.body.raca,
    })
      .then((pet) => pet)
      .catch((err) => err);
    console.log("==>", pet);

    if (pet) {
      const images = req.files.map((file) => `/images/${file.originalname}`);
      // await Foto.bulkCreate(images);
      console.log(images);
      for (img of images) {
        await Foto.create({
          caminho: img,
          fk_pet: pet.id,
        });
      }
      const [caminho] = images;
      const foto = await Foto.findOne({
        where: {
          caminho,
        },
      });
      await Pet.update(
        {
          fk_foto_principal: foto.id,
        },
        { where: { id: pet.id } }
      );
    }

    res.redirect("/user/gerenciamento");
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
  index: async (req, res) => {
    console.log(req.originalUrl);
    const { especie, tipo, raca } = req.query;
    const pet = await Pet.findAll({
      where: {
        fk_raca: raca,
      },
      include: [
        {
          model: User,
          as: "usuario",
          atrributes: ["tipo"],
          where: {
            tipo: tipo,
          },
        },
        {
          model: Raca,
          as: "raca",
          include: "especie",
          where: {
            fk_especie: especie,
          },
        },
      ],
    });

    return res.send(pet);

    // const { raca: fk_raca, especie, page = 1 } = req.query;
    // if (!fk_raca) {
    //   console.log("here");
    //   delete req.query.especie;
    //   const ultimaRaca = await Raca.findOne({
    //     where: {
    //       fk_especie: especie,
    //     },
    //     order: [["id", "DESC"]],
    //   });
    //   const primeiraRaca = await Raca.findOne({
    //     where: {
    //       fk_especie: especie,
    //     },
    //     order: [["id", "ASC"]],
    //   });

    //   console.log(primeiraRaca.id, ultimaRaca.id);

    //   const { count: total, rows: pets } = await Pet.findAndCountAll(
    //     {
    //       limit: 6,
    //       offset: (page - 1) * 6,
    //     },
    //     {
    //       where: {
    //         fk_raca: {
    //           [Op.between]: [primeiraRaca.id, ultimaRaca.id],
    //         },
    //         ...req.query,
    //       },
    //     }
    //   );
    //   let totalPagina = Math.ceil(total / 6);
    //   res.render("screen/lost-found-pets", { pets, totalPagina });
    // }

    // console.log(pets);
  },
};
