require("dotenv").config();

const { sequelize, Pet, Foto, Raca, User } = require("../models");
const { Op } = require("sequelize");
const { costumizeErrors, queryBuilder } = require("../helpers/utils");
const { check, validationResult, body } = require("express-validator");
// Importando pacote para usar com a API
const NodeGeocoder = require("node-geocoder");
const options = {
  apiKey: process.env.API_KEY,
  formatter: null,
};

module.exports = {
  showGrid: async (req, res) => {
    const { especie, tipo, raca, page = 1, ...query } = req.query;
    let serializedStatus = queryBuilder({ status: query.status });
    if (serializedStatus.length === 0) {
      serializedStatus = serializedStatus.concat(
        { status: "PERDIDO" },
        { status: "ENCONTRADO" }
      );
    }
    const serializedQuery = queryBuilder({
      sexo: query.sexo,
      porte: query.porte,
    });

    console.log(serializedQuery);
    let { count: total, rows: pets } = await Pet.findAndCountAll({
      include: [
        "fotoPrincipal",
        {
          model: User,
          as: "usuario",
          ...(tipo && {
            where: {
              tipo: tipo,
            },
          }),
        },
        {
          model: Raca,
          as: "raca",
          include: "especie",
          ...(especie && {
            where: {
              fk_especie: especie,
            },
          }),
        },
      ],
      where: {
        ...(raca && { fk_raca: raca }),
        [Op.or]: serializedStatus,
        ...((query.porte || query.sexo) && { [Op.and]: serializedQuery }),
      },
    });
    let totalPagina = Math.ceil(total / 6);
    pets = pets.slice((page - 1) * 6, 6 * page);
    console.log(serializedStatus);
    res.render("screen/lost-found-pets", {
      pets,
      totalPagina,
      query: {
        ...query,
        status: query.status || serializedStatus.map((obj) => obj.status),
        raca,
        especie,
        tipo,
      },
    });
  },
  showGridAdocao: async (req, res) => {
    let { page = 1, tipo, especie, raca, ...query } = req.query;
    const serializedQuery = queryBuilder(query);
    let { count: total, rows: pets } = await Pet.findAndCountAll({
      include: [
        "fotoPrincipal",
        {
          model: User,
          as: "usuario",
          ...(tipo && {
            where: {
              tipo: tipo,
            },
          }),
        },
        {
          model: Raca,
          as: "raca",
          include: "especie",
          ...(especie && {
            where: {
              fk_especie: especie,
            },
          }),
        },
      ],
      where: {
        ...(raca && { fk_raca: raca }),
        status: "ADOCAO",
        [Op.and]: serializedQuery,
      },
    });
    let totalPagina = Math.ceil(total / 6);
    // const queryString = serializedQuery.reduce(
    //   (a, c) => (a += `${Object.keys(c)}=${Object.values(c)}&`),
    //   ""
    // );
    res.render("screen/adoption-pets", {
      pets,
      totalPagina,
      query: serializedQuery,
      parsedQuery: req.query,
    });
  },
  showPetPerfil: async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findOne({
      where: {
        id,
      },
      include: ["raca", "fotos", "fotoPrincipal"],
    });
    res.render("screen/lost-found-pets-profile", { pet });
  },
  showPetCadastro: (req, res) =>
    res.render("screen/register-lost-found-pets", { errors: {}, pet: {} }),
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
      });

      if (pet) {
        const [firstPic] = req.body.fotosMap.split(";");
        console.log(firstPic);
        const images = req.files.map((file) => `/images/${file.originalname}`);
        // await Foto.bulkCreate(images);
        // return;
        // console.log(images);
        console.log(JSON.stringify(pet));
        for (img of images) {
          await Foto.create({
            caminho: img,
            fk_pet: pet.id,
          });
        }
        const foto = await Foto.findOne({
          where: {
            caminho: `/images/${firstPic}`,
          },
        });
        console.log("princ", foto);
        await Pet.update(
          {
            fk_foto_principal: foto.id,
          },
          { where: { id: pet.id } }
        );
      }
      res.redirect("/user/gerenciamento");
    }
    const e = costumizeErrors(errors);
    if (req.path == "/cadastrar") {
      res.render("screen/register-lost-found-pets", {
        errors: e,
        pet: { ...req.body },
      });
    } else {
      res.render("screen/register-adopted-pets", {
        errors: e,
        pet: { ...req.body },
      });
    }
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
    const { especie, tipo, raca, page = 1, ...query } = req.query;
    console.log(query);
    // return res.render("screen/lost-found-pets", { pets: [], totalPagina: 1 });
    const { cols: total, rows: pets } = await Pet.findAndCountAll({
      include: [
        {
          model: User,
          as: "usuario",
          ...(tipo && {
            where: {
              tipo: tipo,
            },
          }),
        },
        {
          model: Raca,
          as: "raca",
          include: "especie",
          ...(especie && {
            where: {
              fk_especie: especie,
            },
          }),
        },
      ],
      where: {
        ...(raca && { fk_raca: raca }),
        ...query,
        [Op.or]:
          Object.keys(queryBuilder(query)).length === 0
            ? [{ status: "PERDIDO" }, { status: "ENCONTRADO" }]
            : queryBuilder(query),
      },
    });
    // const totalPagina = Math.ceil(total / 6);
    console.log(JSON.stringify(pets), queryBuilder(query));
    res.json(pets);
    // res.render("screen/lost-found-pets", { pets, totalPagina });
  },
};
