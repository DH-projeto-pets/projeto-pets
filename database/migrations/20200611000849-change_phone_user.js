"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("usuarios", "telefone", {
      type: Sequelize.STRING(20),
    });

  },


down: async (queryInterface, Sequelize) => {
  queryInterface.changeColumn("usuarios", "telefone", {
    type: Sequelize.STRING(20),
  });
},
}
