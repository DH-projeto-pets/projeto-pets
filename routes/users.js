var express = require('express');
var router = express.Router();
const { check, validationResult, body } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
