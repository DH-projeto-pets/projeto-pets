module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('fotos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    caminho: Sequelize.STRING(300),
    fk_pet: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      // fazendo a referencia pra tabela
      references: {
        model: 'pets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('fotos'),
};
