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


router.get('/user/edit', (req,res) => {
  return res.render('screen/edit-user');
});

module.exports = router;
