var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  console.log('id: ' + req.query.id);
  var userID = req.query.id;

  res.render('finished', {userID: userID});
});

module.exports = router;
