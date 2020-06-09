var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { checkUser } = require("../middlewares");
const UserController = require("../controllers/UserController");
const upload = require("../helpers/upload");

// router.get("/", UserController.getUser);sa// busca o usuario com base do id que está no cookie e mostra a página de usuario com as informações

router.get("/editar", checkUser, UserController.showUpdate); // mostra o form
router.put(
  "/editar",
  upload.single("image"),
  [
    check("tipo").notEmpty().isIn(["ONG", "PF"]),
    check("email").isEmail().withMessage("Email inválido"),
    check("nome")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres"),
  ],
  UserController.update
); // action do form
router.get("/gerenciamento", checkUser, UserController.showGerenciamento);
router.post("/gerenciamento", checkUser, UserController.indexPets); // mostra a tela de gerenciamento
router.get("/:id?", UserController.show); // busca o usuario com base no id da rota e exibe a pagina de usuario com as informações

module.exports = router;
