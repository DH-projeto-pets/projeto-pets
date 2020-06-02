"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.changeColumn("usuarios", "image", {
      type: Sequelize.STRING(255),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("usuarios", "image", {
      type: Sequelize.BLOB,
    });
  },
};
