module.exports = (sequelize, DataTypes) => {
  const raca = sequelize.define(
    'Raca',
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
      fk_especie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
    },
    {
      tableName: 'racas',
      timestamps: false,
    },
  );

  raca.associate = (models) => {
    raca.belongsTo(models.Especie, {
      foreignKey: 'fk_especie',
      as: 'especie',
    });
  };

  return raca;
};
