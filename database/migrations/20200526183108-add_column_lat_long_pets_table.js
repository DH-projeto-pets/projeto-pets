'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [ 
      await queryInterface.addColumn('enderecos', 'latitude', {
      type: Sequelize.FLOAT(10,6)
    }),
    queryInterface.addColumn('enderecos','longitude', {
      type: Sequelize.FLOAT(10,6)
    })
  ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('enderecos', 'latitude'),
      queryInterface.removeColumn('enderecos', 'longitude')
    ];

  }
};
