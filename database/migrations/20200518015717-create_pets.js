module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('pets', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: Sequelize.STRING(100),
    porte: {
      type: Sequelize.ENUM('PEQUENO', 'MEDIO', 'GRANDE'),
      allowNull: false,
    },
    sexo: {
      type: Sequelize.ENUM('MACHO', 'FEMEA', 'DESCONHECIDO'),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('PERDIDO', 'ENCONTRADO', 'ADOCAO'),
      allowNull: false,
    },
    descricao: Sequelize.STRING(255),
    vacinado: Sequelize.STRING(10),
    castrado: Sequelize.STRING(40),
    vermifugado: Sequelize.STRING(40),
    cuidados_extras: Sequelize.STRING(100),

    // Alteração provisória no banco
    logradouro: Sequelize.STRING(256),
    numero: Sequelize.STRING(256),
    bairro: Sequelize.STRING(256),
    cidade: Sequelize.STRING(256),
    estado: Sequelize.STRING(256),
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    fk_raca: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'racas',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    fk_usuario: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    fk_foto_principal: Sequelize.INTEGER,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('pets'),
};
