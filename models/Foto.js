module.exports = (sequelize, DataTypes) => {
  const foto = sequelize.define(
    'Foto',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      caminho: DataTypes.STRING(300),
      fk_pet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
    },
    {
      tableName: 'fotos',
      timestamps: false,
    },
  );

  return foto;
};
