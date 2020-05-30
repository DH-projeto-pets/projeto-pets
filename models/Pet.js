module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    'Pet',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: DataTypes.STRING(100),
      porte: {
        type: DataTypes.ENUM('PEQUENO', 'MEDIO', 'GRANDE'),
        allowNull: false,
      },
      sexo: {
        type: DataTypes.ENUM('MACHO', 'FEMEA', 'DESCONHECIDO'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('PERDIDO', 'ENCONTRADO', 'ADOCAO'),
        allowNull: false,
      },
      descricao: DataTypes.STRING(255),
      vacinado: DataTypes.STRING(10),
      castrado: DataTypes.STRING(40),
      vermifugado: DataTypes.STRING(40),
      cuidados_extras: DataTypes.STRING(100),


      // Pequena alteração no banco para testes com geolocalização
      logradouro: DataTypes.STRING(256),
      numero: DataTypes.STRING(256),
      bairro: DataTypes.STRING(256),
      cidade: DataTypes.STRING(256),
      estado: DataTypes.STRING(256),
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      // fim da alteração
      
      fk_raca: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      fk_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      fk_foto_principal: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      tableName: 'pets',
      timestamps: true,
    },
  );

  pet.associate = (models) => {
    pet.belongsTo(models.User, {
      foreignKey: 'fk_usuario',
      as: 'usuario',
    });

    pet.belongsTo(models.Raca, {
      foreignKey: 'fk_raca',
      as: 'raca',
    });

    pet.hasMany(models.Foto, {
      foreignKey: 'fk_pet',
      as: 'fotos',
    });

    pet.hasOne(models.Endereco, {
      foreignKey: 'fk_pet',
      as: 'endereco',
    });
  };

  return pet;
};
