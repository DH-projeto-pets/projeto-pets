'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('pets', [{
      "nome": "Toby",
      "porte": "PEQUENO",
      "sexo": "MACHO",
      "status": "PERDIDO",
      "descricao": "Muito amigável",
      "vacinado": 1,
      "castrado": 1,
      "vermifugado": 1,
      "cuidados_extras": "",
      "fk_raca": "1",
      "fk_usuario": "1"
    },
    {
      "nome": "Menina",
      "porte": "PEQUENO",
      "sexo": "FEMEA",
      "status": "ADOCAO",
      "descricao": "Não para quieta",
      "vacinado": 1,
      "castrado": 1,
      "vermifugado": 1,
      "cuidados_extras": "",
      "fk_raca": "1",
      "fk_usuario": "1"
    },
    {
      "nome": "Nick",
      "porte": "MEDIO",
      "sexo": "MACHO",
      "status": "ADOCAO",
      "descricao": "Liigado no 220",
      "vacinado": 1,
      "castrado": 1,
      "vermifugado": 1,
      "cuidados_extras": "",
      "fk_raca": 80,
      "fk_usuario": "1"
    },
    {
      "nome": null,
      "porte": "GRANDE",
      "sexo": "MACHO",
      "status": "ENCONTRADO",
      "descricao": "Muito sociavel",
      "vacinado": 0,
      "castrado": 0,
      "vermifugado": 0,
      "cuidados_extras": "",
      "fk_raca": 90,
      "fk_usuario": "1"
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pets', null, {});
  }
};
