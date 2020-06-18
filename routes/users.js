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
    check("nome").isLength({ min:3 }).withMessage("O nome precisa ter no mínimo 3 caracteres"),
    check("descricao").isLength({min:0,max:255}).withMessage("É permitido no máximo 255 caracteres"),
    check("cep").isLength({min:8, max:8}).withMessage("Campo obrigatório"),
    check("logradouro").isLength({min:1, max:100}).withMessage("Campo obrigatório"),
    check("numero").isLength({min:1, max:5}).withMessage("Campo obrigatório"),
    check("bairro").isLength({min:1, max:40}).withMessage("Campo obrigatório"),
    check("cidade").isLength({min:1, max:40}).withMessage("Campo obrigatório"),
    check("estado").isLength({min:1, max:2}).withMessage("Campo obrigatório")
  ],
  UserController.update
); // action do form
router.get("/gerenciamento", checkUser, UserController.showGerenciamento); // mostra a tela de gerenciamento
router.get("/:id?", UserController.show); // busca o usuario com base no id da rota e exibe a pagina de usuario com as informações

module.exports = router;
