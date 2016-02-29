var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var responses = require('../models/responses');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//handle POST requests dumping information to the database
router.post('/', function(req, res, next) {

  if (req.body) {
    var successResult = {
      success: "Server response: success",
    };

  var responsesSubmitted = new responses({
    userID: req.body.userID,
    traits1: req.body.trait1,
    traits2: req.body.trait2,
    traits3: req.body.trait3,
    issues: req.body.issues,
    chance: req.body.chance,
    clarity: req.body.clarity,
    prefer: req.body.prefer,
    enthusiasm: req.body.enthusiasm,
    peers: req.body.peers,
    peer_enthusiasm: req.body.peer_enthusiasm,
    hillary_clinton_ideology: req.body.hillary_clinton_ideology,
    bernie_sanders_ideology: req.body.bernie_sanders_ideology,
    ted_cruz_ideology: req.body.ted_cruz_ideology,
    donald_trump_ideology: req.body.donald_trump_ideology,
    john_kasich_ideology: req.body.john_kasich_ideology,
    ben_carson_ideology: req.body.ben_carson_ideology,
    marco_rubio_ideology: req.body.marco_rubio_ideology,
    gender: req.body.gender,
    pid: req.body.pid,
    primary: req.body.primary,
    ideology: req.body.ideology,
    race: req.body.race,
    income: req.body.income,
    time: req.body.time
  });

  responsesSubmitted.save(function(err) {
      if (err) throw err;

      //res.send({url: '/finished?id=' + id});
      res.send({url: "/finished?id=" + req.body.userID});
      console.log(JSON.stringify(req.body));
      console.log("Saved the user info!");
    });
  }
});


/*
router('/idcheck', function(req, res, next) {

  if (req.body.timeID) {
    responses.find({timeID: req.body.timeID}, function (err, idFound) {

      if (err) {
        console.log('err: ' + err);
        res.send({status: 'clear'});
      } else {
        console.log('idFound: ' + idFound);
        res.send({status: 'taken'});
      }

    });
  }
});
*/
module.exports = router;
