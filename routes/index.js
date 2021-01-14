var express = require('express');
var router = express.Router();
const mail = require('./mail');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/mail', mail);

module.exports = router;
