
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('pets', {
    fields: ['fk_foto_principal'],
    type: 'FOREIGN KEY',
    name: 'fk_foto_principal',
    references: {
      table: 'fotos',
      field: 'id',
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('pets', 'fk_foto_principal'),
};
