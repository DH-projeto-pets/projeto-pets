const { Router } = require("express");
const { check, validationResult, body } = require("express-validator");
const router = Router();
const { petAdoptionValidation } = require('../middlewares/validations')
const PetController = require("../controllers/PetController");

const { checkUser } = require("../middlewares");
const upload = require("../helpers/upload");

router.get("/", PetController.showGrid);
router.get("/adocao", PetController.showGridAdocao);
router.get("/cadastrar", checkUser, PetController.showPetCadastro);
router.post(
  "/cadastrar",
  // [check("status").isEmpty(), check("raca").isEmpty(), check("especie").isEmpty(), check("porte").isEmpty(), check("sexo").isEmpty(),],
  [check("status").isIn(['oi', 'tchau']).withMessage('Este campo deve ser preenchido!')],
  upload.array("fotos"),
  PetController.store
);
router.get("/adocao/cadastrar", checkUser, PetController.showPetCadastroAdocao);
router.post("/adocao/cadastrar", upload.array("fotos"), petAdoptionValidation, PetController.store);

router.get("/:id/editar", checkUser, PetController.showPetEdicao);
router.put("/:id/editar", PetController.update);
router.get("/adocao/:id/editar", checkUser, PetController.showPetEdicaoAdocao);
router.put("/adocao/:id/editar", PetController.update);
router.get("/:id", PetController.showPetPerfil);
router.delete("/delete", PetController.delete);

module.exports = router;
