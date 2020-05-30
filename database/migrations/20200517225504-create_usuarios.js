module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('usuarios', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: Sequelize.STRING(100),
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    image: Sequelize.BLOB('long'),
    senha: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    tipo: Sequelize.ENUM('PF', 'ONG'),
    descricao: Sequelize.STRING(255),
    telefone: Sequelize.STRING(10),
    facebook: Sequelize.STRING(40),
    instagram: Sequelize.STRING(40),
    twitter: Sequelize.STRING(40),

    // Alteração provisória no banco
    logradouro: Sequelize.STRING(256),
    numero: Sequelize.STRING(256),
    bairro: Sequelize.STRING(256),
    cidade: Sequelize.STRING(256),
    estado: Sequelize.STRING(256),
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('usuarios'),
};
