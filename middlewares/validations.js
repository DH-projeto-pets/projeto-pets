const { check, validationResult, body } = require("express-validator");

const statusValidation = [
  check("status")
    .isIn(["PERDIDO", "ENCONTRADO"])
    .withMessage("Campo obrigatório"),
];
const petValidation = [
  check("porte")
    .isIn(["GRANDE", "MEDIO", "PEQUENO"])
    .withMessage("Campo obrigatório"),
  check("especie").notEmpty().withMessage("Campo obrigatório"),
  check("raca").notEmpty().withMessage("Campo obrigatório"),
  check("sexo")
    .isIn(["FEMEA", "MACHO", "DESCONHECIDO"])
    .withMessage("Campo obrigatório"),
  check("fotosMap").notEmpty().withMessage("Selecionar ao menos uma foto."),
];

const petAdoptionValidation = [
  check("status").isIn(["ADOCAO"]),
  check("castrado").isIn(["0", "1"]).withMessage("Campo obrigatório."),
  check("vermifugado").isIn(["0", "1"]).withMessage("Campo obrigatório"),
  check("vacinado").isIn(["0", "1"]).withMessage("Campo obrigatório"),
];

const updateValidation = [
  check("porte")
    .isIn(["GRANDE", "MEDIO", "PEQUENO"])
    .withMessage("Campo obrigatório"),
  check("especie").notEmpty().withMessage("Campo obrigatório"),
  check("raca").notEmpty().withMessage("Campo obrigatório"),
  check("sexo")
    .isIn(["FEMEA", "MACHO", "DESCONHECIDO"])
    .withMessage("Campo obrigatório"),
];

module.exports = {
  statusValidation,
  petValidation,
  petAdoptionValidation,
  updateValidation,
};
