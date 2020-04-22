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

// Rota para cadastro de usuário
router.get('/user/register', (req,res) => {
  return res.render("screen/register-user");
});
// rota para gerenciamento de pets cadastrados
router.get('/user/pet-management', (req,res) => {
  return res.render("screen/manager-pet");
});
// rota para cadastro de pets para adoção
router.get('/user/pet/adoption-register', (req,res) => {
  return res.render("screen/register-adopted-pets");
});

module.exports = router;
