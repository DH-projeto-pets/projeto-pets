const { sequelize, Pet } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  showGrid: async (req, res) => {
    const pets = await Pet.findAll({
      where: {
        [Op.or]: [
          { status: 'PERDIDO' },
          { status: 'ENCONTRADO' }
        ]
      }
    });
    res.render('screen/lost-found-pets', { pets })
  },
  showGridAdocao: async (req, res) => {
    const pets = await Pet.findAll({
      where: {
        status: {
          [Op.eq]: 'ADOCAO'
        },
      }
    });
    res.render('screen/adoption-pets', { pets })
  },
  showPetPerfil: async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findOne({
      where: {
        id
      },
      include: ["raca"]
    });
    res.render('screen/lost-found-pets-profile', { pet })
  },
  showPetCadastro: (req, res) => res.render('screen/register-lost-found-pets'),
  showPetEdicao: async (req, res) => {
    const pet = await Pet.findOne({
      where: {
        [Op.or]: [{ status: 'ENCONTRADO' }, { status: 'PERDIDO' }],
        [Op.and]: [
          { id: req.params.id },
          { fk_usuario: req.session.user.id }
        ]
      }

    })
    console.log(pet)
    res.render('screen/edit-lost-found-pets', { pet })
  },

  showPetCadastroAdocao: (req, res) => res.render('screen/register-adopted-pets'),
  showPetEdicaoAdocao: async (req, res) => {
    const pet = await Pet.findOne({
      where: {
        [Op.and]: [
          { fk_usuario: req.session.user.id },
          { id: req.params.id },
          { status: 'ADOCAO' }
        ]
      }
    })
    console.log(pet)
    res.render('screen/edit-adopted-pets', { pet })
  }, // Rose


  // controla o banco


  update: async (req, res) => {

    const pet = await Pet.update({
      ...req.body
    },
      { where: { id: req.params.id } },

    );
    return res.redirect("/user/gerenciamento");

  },

  store: async (req, res) => {
    console.log(req.body);

    const pet = await Pet.create({
      ...req.body,
      fk_usuario: req.session.user.id,
      fk_raca: req.body.raca
    }).then(pet => pet).catch(err => err);
    console.log("==>", pet)

    res.redirect("/user/gerenciamento");
  },
  delete: async (req, res) => {
    const { id: petId } = req.body;
    const { id: userId } = req.session.user;
    const pet = await Pet.destroy({
      where: {
        [Op.and]: [
          { id: petId },
          { fk_usuario: userId }
        ]
      }
    });

    res.redirect("/user/gerenciamento");
  },

};

