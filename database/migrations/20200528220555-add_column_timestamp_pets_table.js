"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn("pets", "createdAt", {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("pets", "updatedAt", {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn("pets", "createdAt"),
      queryInterface.removeColumn("pets", "updatedAt"),
    ];
  },
};
