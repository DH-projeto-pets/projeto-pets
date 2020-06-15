"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("enderecos", "cep", Sequelize.STRING(10));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("enderecos", "cep");
  },
};
