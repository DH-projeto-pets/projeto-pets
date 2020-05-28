module.exports = (sequelize, DataTypes) => {
  const endereco = sequelize.define(
    'Endereco',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      latitude: DataTypes.FLOAT(10,6),
      longitude: DataTypes.FLOAT(10,6),
      logradouro: DataTypes.STRING(100),
      numero: DataTypes.STRING(5),
      complemento: DataTypes.STRING(60),
      bairro: DataTypes.STRING(40),
      cidade: DataTypes.STRING(40),
      estado: DataTypes.STRING(2),
      fk_pet: {
        type: DataTypes.INTEGER,
        foreignKey:true,
      },
      fk_usuario: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      tableName: 'enderecos',
      timestamps: false,
    },
  );

  return endereco;
};
