var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  console.log('id: ' + req.query.id);
  var userID = req.query.id;

  res.render('finished', {userID: userID});
});

/*
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
      //res.send({success: "server response: success"});
      res.render({userID: req.body.userID});
      console.log(JSON.stringify(req.body));
      console.log("Saved the user info!");
    });
  }
});

*/

module.exports = router;
