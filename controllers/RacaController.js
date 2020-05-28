const { sequelize, Raca } = require("../models");
module.exports = {
  index: async (req, res) => {
    const { especieId: fk_especie } = req.params;
    console.log(fk_especie);
    const racas = await Raca.findAll({ where: { fk_especie } });
    res.json(racas);
  },
};
