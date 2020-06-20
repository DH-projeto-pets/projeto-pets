"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("usuarios", "facebook", {
      type: Sequelize.STRING(100),
    });

    queryInterface.changeColumn("usuarios", "instagram", {
      type: Sequelize.STRING(100),
    });
    queryInterface.changeColumn("usuarios", "twitter", {
      type: Sequelize.STRING(100),
    });
  },


down: async (queryInterface, Sequelize) => {
  await queryInterface.changeColumn("usuarios", "facebook", {
    type: Sequelize.STRING(100),
  });

  queryInterface.changeColumn("usuarios", "instagram", {
    type: Sequelize.STRING(100),
  });
  queryInterface.changeColumn("usuarios", "twitter", {
    type: Sequelize.STRING(100),
  });
},
}
