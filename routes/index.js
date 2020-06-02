var express = require("express");
var router = express.Router();
const { check, validationResult, body } = require("express-validator");
const IndexController = require("../controllers/IndexController");
const UserController = require("../controllers/UserController");

const { checkUser, checkUserLogado } = require("../middlewares");

// add middleware na rota /
router.get("/", checkUser, IndexController.auth);
router.get("/login", checkUserLogado, IndexController.showLogin);
router.post(
  "/login",
  [check("email").isEmail(), check("senha").isLength({ min: 4 })],
  UserController.login
);
router.get("/cadastrar", checkUserLogado, IndexController.showRegister);
router.post("/cadastrar", UserController.store);
// router.get('/recuperar-senha', IndexController.showRecover);
router.get("/logout", IndexController.logout);
router.get("/sobre", IndexController.showAbout);
router.get("/termos-de-uso", IndexController.showTerms);
router.get("/container", (r, res) => res.render("screen/container"));

module.exports = router;
