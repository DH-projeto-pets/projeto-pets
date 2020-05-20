
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('enderecos', 'fk_pet', {
      type: Sequelize.INTEGER,
      foreignKey: true,
    });
    return queryInterface.addConstraint('enderecos', {
      fields: ['fk_pet'],
      type: 'FOREIGN KEY',
      name: 'fk_pet',
      references: {
        table: 'pets',
        field: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('enderecos', 'fk_pet');
    return queryInterface.removeConstraint('enderecos', 'fk_pet');
  },
};
