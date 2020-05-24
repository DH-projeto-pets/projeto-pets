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
      }
    });
    res.render('screen/lost-found-pets-profile', { pet })
  },
  showPetCadastro: (req, res) => res.render('screen/register-lost-found-pets'),
  showPetEdicao: async (req, res) => {
    
    const pet = await Pet.findOne({
      where: {
        [Op.and]:[
          {fk_usuario: req.session.user.id},
          {id: req.params.id}
        ]
      }
      
    })
      console.log(pet)
    res.render('screen/edit-lost-found-pets', { pet })
  }, // Rose


  showPetCadastroAdocao: (req, res) => res.render('screen/register-adopted-pets'),
  showPetEdicaoAdocao: (req, res) => res.render('screen/edit-adopted-pets'), // Rose


  // controla o banco
  store: (req, res) => { },
  update: (req, res) => { },
  delete: (req, res) => { },
  index: (req, res) => { },
  show: (req, res) => { },
};

