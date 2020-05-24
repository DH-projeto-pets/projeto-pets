var express = require("express");
var router = express.Router();
const { checkUser } = require("../middlewares");

const UserController = require("../controllers/UserController");

// router.get("/", UserController.getUser);sa// busca o usuario com base do id que está no cookie e mostra a página de usuario com as informações

router.get("/editar", checkUser, UserController.showUpdate); // mostra o form
router.put("/editar", UserController.update); // action do form
router.get("/gerenciamento", checkUser, UserController.showGerenciamento); // mostra a tela de gerenciamento
router.get("/:id?", UserController.show); // busca o usuario com base no id da rota e exibe a pagina de usuario com as informações

module.exports = router;
