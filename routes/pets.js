const { Router } = require("express");
const { check, validationResult, body } = require("express-validator");
const router = Router();
const {
  petAdoptionValidation,
  statusValidation,
  petValidation,
  updateValidation,
} = require("../middlewares/validations");
const PetController = require("../controllers/PetController");

const { checkUser } = require("../middlewares");
const upload = require("../helpers/upload");

router.get("/", PetController.showGrid);
router.get("/adocao", PetController.showGridAdocao);
router.get("/cadastrar", checkUser, PetController.showPetCadastro);
router.post(
  "/cadastrar",
  upload.array("fotos"),
  statusValidation,
  petValidation,
  PetController.store
);
router.get("/adocao/cadastrar", checkUser, PetController.showPetCadastroAdocao);
router.post(
  "/adocao/cadastrar",
  upload.array("fotos"),
  petValidation,
  petAdoptionValidation,
  PetController.store
);

router.get("/:id/editar", checkUser, PetController.showPetEdicao);
router.put(
  "/:id/editar",
  upload.array("fotos"),
  statusValidation,
  updateValidation,
  PetController.update
);
router.get("/adocao/:id/editar", checkUser, PetController.showPetEdicaoAdocao);
router.put(
  "/adocao/:id/editar",
  upload.array("fotos"),
  petValidation,
  petAdoptionValidation,
  PetController.update
);
router.get("/:id", PetController.showPetPerfil);
router.delete("/delete", PetController.delete);
router.post("/list", PetController.getPets);

module.exports = router;
