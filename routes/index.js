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

router.get('/pets-perdidos-encontrados/editar-pet', (req,res) => {
  return res.render('screen/register-lost-found-pets', { logged: true });
});

router.get('/user/editar', (req,res) => {
  return res.render('screen/edit-user', { logged: true });
});

router.get('/login', (req,res) => {
  return res.render('screen/login', { logged: false });
});

router.get('/esqueci-senha', (req,res) => {
  return res.render('screen/forgot-password', { logged: false });
});

router.get('/home/user', (req,res) => {
  return res.render('screen/home', { logged: true });
});

router.get('/pets/procurando', (req,res) => {
  return res.render('screen/lost-found-pets', { logged: true });
});


router.get('/perfil-pet-adocao', (req,res) => {
  return res.render('screen/adoption-pets-profile', { logged: true });
});

router.get('/perfil-pet-encontrado', (req,res) => {
  return res.render('screen/lost-found-pets-profile', { logged: true });
});

router.get('/perfil-pet-perdido', (req,res) => {
  return res.render('screen/lost-found-pets-profile', { logged: true });
});

// Rota para cadastro de usuário
router.get('/cadastrar', (req,res) => {
  return res.render("screen/register-user", { logged: false });
});
// rota para gerenciamento de pets cadastrados
router.get('/user/gerenciamento', (req,res) => {
  return res.render("screen/manager-pet", 
                      { 
                        logged: true, 
                        nome: 'Daia', 
                        image: '/images/pet.jpg'
                      });
});
// rota para cadastro de pets para adoção

router.get('/user/cadastro-pets-adocao', (req,res) => {
  return res.render("screen/register-adopted-pets", { logged: true });

});
router.get('/perfil-dono', (req,res) => {
  return res.render('screen/owner-profile', { logged: true });

});
// rota para termos de uso
router.get('/termos-de-uso', (req, res) => {
  return res.render('screen/terms-of-use', { logged: false });
});
// rota para grid de pets perdidos e encontrados
router.get('/pets-perdidos-encontrados', (req, res) => {
  return res.render('screen/lost-found-pets', { logged: true });
});

module.exports = router;
