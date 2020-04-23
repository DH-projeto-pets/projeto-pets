var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sobre', (req, res) => {
  return res.render('screen/about')
});

router.get('/pets/new', (req,res) => {
  return res.render('screen/register-lost-found-pets');
});

router.get('/pets/new2', (req,res) => {
  return res.render('screen/register-adoption-pets');
});

router.get('/user/edit', (req,res) => {
  return res.render('screen/edit-user');
});

router.get('/login', (req,res) => {
  return res.render('screen/login');
});

router.get('/lost-passwd', (req,res) => {
  return res.render('screen/forgot-password');
});

router.get('/home/user', (req,res) => {
  return res.render('screen/home');
});

router.get('/pets/procurando', (req,res) => {
  return res.render('screen/lost-found-pets');
});


router.get('/adoptionpet', (req,res) => {
  return res.render('screen/adoption-pets-profile');
});

router.get('/lostfoundpet', (req,res) => {
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


module.exports = router;
