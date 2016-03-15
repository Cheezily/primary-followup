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

  var responsesSubmitted = new responses({
    userID: req.body.userID,
    vote2: req.body.vote2,
    vote_other: req.body.vote_other,
    why_no: req.body.why_no,
    why_yes: req.body.why_yes,
    prefer2: req.body.prefer2,
    enthusiasm2: req.body.enthusiasm2,
    yourself2: req.body.yourself2,
    sanders2: req.body.sanders2,
    clinton2: req.body.clinton2,
    trump2: req.body.trump2,
    kasich2: req.body.kasich2,
    cruz2: req.body.cruz2,
    traits2_1: req.body.traits2_1,
    traits2_2: req.body.traits2_2,
    traits2_3: req.body.traits2_3,
    issues2: req.body.issues2,
    clarity2: req.body.clarity2,
    chance2: req.body.chance2,
    gen_elec: req.body.gen_elec,
    open_ended1: req.body.open_ended1,
    open_ended2: req.body.open_ended2,
    time: req.body.time
  });

  responsesSubmitted.save(function(err) {
      if (err) throw err;

      //res.send({url: '/finished?id=' + id});
      res.send({success: "Responses captured for id: " + req.body.userID});
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
