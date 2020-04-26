var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', logged: false });
});

router.get('/sobre', (req, res) => {
  return res.render('screen/about', { logged: false })
});

router.get('/pets-perdidos-encontrados/novo', (req,res) => {
  return res.render('screen/register-lost-found-pets', { logged: true });
});

router.get('/pets/new2', (req,res) => {
  return res.render('screen/register-adoption-pets');
});

router.get('/user/editar', (req,res) => {
  return res.render('screen/edit-user', { logged: true });
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

router.get('/perfilpetadocao', (req,res) => {
  return res.render('screen/adoption-pets-profile');
});

router.get('/perfilpetencontrado', (req,res) => {
  return res.render('screen/lost-found-pets-profile');
});

router.get('/perfilpetperdido', (req,res) => {
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
router.get('/user/registro-pets', (req,res) => {
  return res.render("screen/register-adopted-pets");

});
router.get('/perfildono', (req,res) => {
  return res.render('screen/owner-profile');
});
// rota para termos de uso
router.get('/termos-de-uso', (req, res) => {
  return res.render('screen/terms-of-use');
});
// rota para grid de pets perdidos e encontrados
router.get('/pets-perdidos-encontrados', (req, res) => {
  return res.render('screen/lost-found-pets', { logged: true });
});

module.exports = router;
