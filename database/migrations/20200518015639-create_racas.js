module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('racas', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    fk_especie: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'especies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('racas'),
};
