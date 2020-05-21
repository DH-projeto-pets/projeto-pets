"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "usuarios",
      [{ email: "halmeida@digitalhouse.com", senha: "123456" }],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("usuarios", null, {});
  },
};
