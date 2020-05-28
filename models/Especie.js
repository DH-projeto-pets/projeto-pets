module.exports = (sequelize, DataTypes) => {
  const especie = sequelize.define(
    'Especie',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: 'especies',
      timestamps: false,
    },
  );

  return especie;
};
