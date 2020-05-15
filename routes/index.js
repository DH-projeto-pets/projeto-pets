var express = require("express");
var router = express.Router();
const { check, validationResult, body } = require("express-validator");
const IndexController = require('../controllers/IndexController')
const UserController = require('../controllers/UserController');

// add middleware na rota /
router.get('/', IndexController.auth);
router.get('/login', IndexController.showLogin);
router.post('/login', UserController.login);
router.get('/cadastrar', IndexController.showRegister);
router.post('/cadastrar', UserController.store);
// router.get('/recuperar-senha', IndexController.showRecover);
router.get('/sobre', IndexController.showAbout);
router.get('/termos-de-uso', IndexController.showTerms);

module.exports = router;
