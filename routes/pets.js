const { Router } = require("express");
const router = Router();

const PetController = require("../controllers/PetController");

const { checkUser } = require("../middlewares");

router.get("/", PetController.showGrid);
router.get("/adocao", PetController.showGridAdocao);
router.get("/cadastrar", checkUser, PetController.showPetCadastro);
router.post("/cadastrar", PetController.store);
router.get("/adocao/cadastrar", checkUser, PetController.showPetCadastroAdocao);
router.post("/adocao/cadastrar", PetController.store);
router.get("/:id/editar", checkUser, PetController.showPetEdicao);
router.put("/:id/editar", PetController.update);
router.get("/adocao/:id/editar", checkUser, PetController.showPetEdicaoAdocao);
router.put("/adocao/:id/editar", PetController.update);
router.get("/:id", PetController.showPetPerfil);
router.delete("/:id", PetController.delete);

module.exports = router;
