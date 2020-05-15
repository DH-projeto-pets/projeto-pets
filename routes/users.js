var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController')

router.get('/user', UserController.getUser); // busca o usuario com base do id que está no cookie e mostra a página de usuario com as informações 

router.get('/user/:id', UserController.show); // busca o usuario com base no id da rota e exibe a pagina de usuario com as informações

router.get('/user/editar', UserController.showUpdate); // mostra o form
router.update('/user/editar', UserController.update); // action do form

router.get('/user/gerenciamento', UserController.showGerenciamento); // mostra a tela de gerenciamento

module.exports = router;
