var express = require('express');
var router = express.Router();
var responses = require("../models/responses");


router.post('/', function(req, res, next) {

  if (req.body) {
    responses.find({userID: req.body.userID}, function (err, idFound) {

      if (err) {
        console.log('err: ' + err);

      } else {
        if (idFound.length === 0) {
          console.log("contents of idFound: " + idFound)
          res.send({status: 'clear'});
        } else {
          console.log('idFound: ' + idFound);
          res.send({status: 'taken'});
        }

      }

    });
  }
});

module.exports = router;
