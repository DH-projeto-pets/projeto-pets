"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("pets", "vacinado", {
      type: Sequelize.BOOLEAN,
    });

    queryInterface.changeColumn("pets", "castrado", {
      type: Sequelize.BOOLEAN,
    });
    queryInterface.changeColumn("pets", "vermifugado", {
      type: Sequelize.BOOLEAN,
    });
  },
};
