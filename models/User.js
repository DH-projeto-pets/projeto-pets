module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: DataTypes.STRING(100),
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      image: DataTypes.BLOB('long'),
      tipo: DataTypes.ENUM('PF', 'ONG'),
      descricao: DataTypes.STRING(255),
      telefone: DataTypes.STRING(10),
      facebook: DataTypes.STRING(40),
      instagram: DataTypes.STRING(40),
      twitter: DataTypes.STRING(40),
    },
    {
      tableName: 'usuarios',
      timestamps: false,
    },
  );

  user.associate = (models) => {
    user.hasOne(models.Endereco, {
      foreignKey: 'fk_usuario',
      as: 'endereco',
    });

    user.hasMany(models.Pet, {
      foreignKey: 'fk_usuario',
      as: 'pets',
    });
  };

  return user;
};
