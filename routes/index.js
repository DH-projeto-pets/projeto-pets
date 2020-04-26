var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sobre', (req, res) => {
  return res.render('screen/about')
});

router.get('/pets-perdidos-encontrados/novo', (req,res) => {
  return res.render('screen/register-lost-found-pets');
});

router.get('/user/editar', (req,res) => {
  return res.render('screen/edit-user');
});

router.get('/login', (req,res) => {
  return res.render('screen/login');
});

router.get('/esqueci-senha', (req,res) => {
  return res.render('screen/forgot-password');
});

router.get('/home/user', (req,res) => {
  return res.render('screen/home');
});

router.get('/pets/procurando', (req,res) => {
  return res.render('screen/lost-found-pets');
});

router.get('/perfil-pet-adocao', (req,res) => {
  return res.render('screen/adoption-pets-profile');
});

router.get('/perfil-pet-encontrado', (req,res) => {
  return res.render('screen/lost-found-pets-profile');
});

router.get('/perfil-pet-perdido', (req,res) => {
  return res.render('screen/lost-found-pets-profile');
});

// Rota para cadastro de usuário
router.get('/user/cadastro', (req,res) => {
  return res.render("screen/register-user");
});
// rota para gerenciamento de pets cadastrados
router.get('/user/gerenciamento', (req,res) => {
  return res.render("screen/manager-pet");
});
// rota para cadastro de pets para adoção
router.get('/user/cadastro-pets-adocao', (req,res) => {
  return res.render("screen/register-adopted-pets");

});
router.get('/perfil-dono', (req,res) => {
  return res.render('screen/owner-profile');
});
// rota para termos de uso
router.get('/termos-de-uso', (req, res) => {
  return res.render('screen/terms-of-use');
});
// rota para grid de pets perdidos e encontrados
router.get('/pets-perdidos-encontrados', (req, res) => {
  return res.render('screen/lost-found-pets');
});

module.exports = router;
