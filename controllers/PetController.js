require("dotenv").config();

const { sequelize, Pet, Foto, Raca, User } = require("../models");
const { Op, QueryTypes } = require("sequelize");
const {
  costumizeErrors,
  queryBuilder,
  createWhereClause,
  createUrl,
} = require("../helpers/utils");
const { check, validationResult, body } = require("express-validator");
// Importando pacote para usar com a API
const NodeGeocoder = require("node-geocoder");
const options = {
  apiKey: process.env.API_KEY,
  formatter: null,
};

module.exports = {
  showGrid: async (req, res) => {
    let { especie, tipo, raca, page = 1, ...query } = req.query;
    if (!query.status) {
      query.status = ["PERDIDO", "ENCONTRADO"];
    }
    const whereClause = createWhereClause(query);
    let pets = await sequelize.query(
      `SELECT pet.nome, pet.id, pet.status, foto.caminho FROM pets AS pet LEFT OUTER JOIN fotos AS foto ON pet.fk_foto_principal = foto.id INNER JOIN usuarios AS usuario ON pet.fk_usuario = usuario.id ${
        Array.isArray(tipo) || !tipo
          ? `AND usuario.tipo IN ('PF', 'ONG')`
          : `AND usuario.tipo = :tipo `
      } INNER JOIN racas AS raca ON pet.fk_raca = raca.id ${
        especie
          ? "AND raca.fk_especie = :especie LEFT OUTER JOIN especies as especie ON raca.fk_especie = especie.id"
          : ""
      } ${whereClause ? `WHERE ${whereClause}` : ""} ${
        raca ? `AND pet.fk_raca = :raca` : ""
      } LIMIT ${6} OFFSET ${(page - 1) * 6}`,
      {
        replacements: {
          whereClause,
          tipo,
          raca,
          especie,
        },
        type: QueryTypes.SELECT,
      }
    );
    let total = await sequelize.query(
      `SELECT pet.nome, pet.id, pet.status, foto.caminho FROM pets AS pet LEFT OUTER JOIN fotos AS foto ON pet.fk_foto_principal = foto.id INNER JOIN usuarios AS usuario ON pet.fk_usuario = usuario.id ${
        Array.isArray(tipo) || !tipo
          ? `AND usuario.tipo IN ('PF', 'ONG')`
          : `AND usuario.tipo = :tipo `
      } INNER JOIN racas AS raca ON pet.fk_raca = raca.id ${
        especie
          ? "AND raca.fk_especie = :especie LEFT OUTER JOIN especies as especie ON raca.fk_especie = especie.id"
          : ""
      } ${whereClause ? `WHERE ${whereClause}` : ""} ${
        raca ? `AND pet.fk_raca = :raca` : ""
      }`,
      {
        replacements: {
          whereClause,
          tipo,
          raca,
          especie,
        },
        type: QueryTypes.SELECT,
      }
    );
    const totalPagina = Math.ceil(total.length / 6);
    res.render("screen/lost-found-pets", {
      pets,
      totalPagina,
      query: {
        ...query,
        raca,
        especie,
        tipo,
      },
      url: createUrl({
        ...query,
        raca,
        especie,
        tipo,
      }),
    });
  },
  showGridAdocao: async (req, res) => {
    let { especie, tipo, raca, page = 1, ...query } = req.query;
    const serializedQuery = queryBuilder(query);

    if (!query.status) {
      query.status = "ADOCAO";
    }
    const whereClause = createWhereClause(query);
    let pets = await sequelize.query(
      `SELECT pet.nome, pet.id, pet.status, foto.caminho FROM pets AS pet LEFT OUTER JOIN fotos AS foto ON pet.fk_foto_principal = foto.id INNER JOIN usuarios AS usuario ON pet.fk_usuario = usuario.id ${
        Array.isArray(tipo) || !tipo
          ? `AND usuario.tipo IN ('PF', 'ONG')`
          : `AND usuario.tipo = :tipo `
      } INNER JOIN racas AS raca ON pet.fk_raca = raca.id ${
        especie
          ? "AND raca.fk_especie = :especie LEFT OUTER JOIN especies as especie ON raca.fk_especie = especie.id"
          : ""
      } ${whereClause ? `WHERE ${whereClause}` : ""} ${
        raca ? `AND fk.raca = :raca` : ""
      } LIMIT ${6} OFFSET ${(page - 1) * 6}`,
      {
        replacements: {
          whereClause,
          tipo,
          raca,
          especie,
        },
        type: QueryTypes.SELECT,
      }
    );
    let total = await sequelize.query(
      `SELECT pet.nome, pet.id, pet.status, foto.caminho FROM pets AS pet LEFT OUTER JOIN fotos AS foto ON pet.fk_foto_principal = foto.id INNER JOIN usuarios AS usuario ON pet.fk_usuario = usuario.id ${
        Array.isArray(tipo) || !tipo
          ? `AND usuario.tipo IN ('PF', 'ONG')`
          : `AND usuario.tipo = :tipo `
      } INNER JOIN racas AS raca ON pet.fk_raca = raca.id ${
        especie
          ? "AND raca.fk_especie = :especie LEFT OUTER JOIN especies as especie ON raca.fk_especie = especie.id"
          : ""
      } ${whereClause ? `WHERE ${whereClause}` : ""} ${
        raca ? `AND fk.raca = :raca` : ""
      }`,
      {
        replacements: {
          whereClause,
          tipo,
          raca,
          especie,
        },
        type: QueryTypes.SELECT,
      }
    );
    
    let totalPagina = Math.ceil(total.length / 6);
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
    console.log(pet);
    if (pet) {
      return res.render("screen/lost-found-pets-profile", { pet });
    }
    return res.render("404-not-found");
  },
  showPetCadastro: (req, res) =>
    res.render("screen/register-lost-found-pets", { errors: {}, pet: {} }),
  showPetEdicao: async (req, res) => {
    const pet = await Pet.findOne({
      where: {
        [Op.or]: [{ status: "ENCONTRADO" }, { status: "PERDIDO" }],
        [Op.and]: [{ id: req.params.id }, { fk_usuario: req.session.user.id }],
      },
      include: [
        {
          model: Raca,
          as: "raca",
          include: "especie",
        },
        "fotoPrincipal",
      ],
    });
    console.log(JSON.stringify(pet));
    res.render("screen/edit-lost-found-pets", { errors: {}, pet });
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
    res.render("screen/edit-adopted-pets", { pet, errors: {} });
  }, // Rose

  // controla o banco

  update: async (req, res) => {
    console.log("req.body:", req.body);
    errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      const pet = await Pet.update(
        {
          ...req.body,
        },
        { where: { id: req.params.id }, include: ["fotoPrincipal"] }
      );
      console.log(pet);
      return res.redirect("/user/gerenciamento");
    } else {
      const e = costumizeErrors(errors);
      if (req.path == `/${req.params.id}/editar`) {
        return res.render("screen/edit-lost-found-pets", {
          errors: e,
          pet: req.body,
        });
      } else {
        return res.render("screen/edit-adopted-pets", {
          errors: e,
          pet: req.body,
        });
      }
    }
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
