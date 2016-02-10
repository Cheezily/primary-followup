var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var userInfo = require('../models/responses');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//handle POST requests dumping information to the database
router.post('/submit', function(req, res, next) {

  if (req.body) {
    var successResult = {
      success: "Server response: success",
    };

  var responsesSubmitted = new responses({
    timeID: req.body.timeID,
    traits1: req.body.trait1,
    traits2: req.body.trait2,
    traits3: req.body.trait3,
    issues: req.body.issues,
    clarity: req.body.clarity,
    prefer: req.body.prefer,
    enthusiasm: req.body.enthusiasm,
    peers: req.body.peers,
    peer_enthusiasm: req.body.peer_enthusiasm,
    gender: req.body.gender,
    pid: req.body.pid,
    primary: req.body.primary,
    ideology: req.body.ideology,
    race: req.body.race,
    income: req.body.income
  });

  responsesSubmitted.save(function(err) {
      if (err) throw err;

      res.send(successResult);
      console.log(JSON.stringify(req.body));
      //console.log("Saved the user info!");
    });
  }
});

module.exports = router;
