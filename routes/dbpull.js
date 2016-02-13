var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var responses = require('../models/responses');
var json2csv = require('json2csv');
var warning = '';

var password;
if (process.env.DBPULL_PW) {
  password = process.env.DBPULL_PW;
} else {
  password = 'password';
}

var fields = ['id', 'userID', 'traits1', 'traits2', 'traits3', 'issues', 'clarity',
  'prefer', 'enthusiasm', 'peers', 'peer_enthusiasm', 'hillary_clinton_ideology',
  'bernie_sanders_ideology', 'jeb_bush_ideology', 'ted_cruz_ideology',
  'donald_trump_ideology', 'john_kasich_ideology', 'ben_carson_ideology',
  'marco_rubio_ideology', 'gender', 'pid', 'primary',
  'ideology', 'race', 'income'];


/* GET dbpull page. */
router.get('/', function(req, res, next) {
  res.render('dbpull', {warning: warning});
  warning = '';
});


router.post('/', function(req, res, next) {

  if (req.body.pw == password) {

    //grab the contents of the userinfo db collection and pass
    //it to json2csv to be saved into a temporary file, dbDump.csv
    responses.find({}, function (err, dbDump) {
      if (err) throw err;

      json2csv({data: dbDump, fields: fields}, function (err, csv) {
        if (err) console.log(err);

        //dump the csv into the temp file
        fs.writeFile('./CSVoutput/dbDump.csv', csv, function (err) {
          if (err) throw err;

          //downloads the output csv file in the browser and
          //then clears out the contents of the temp file

          res.download('./CSVoutput/dbDump.csv', 'output.csv', function () {
            setTimeout(function() {
              fs.unlinkSync('./CSVoutput/dbDump.csv', function(err) {
                if (err) throw err;
                console.log('csv deleted');
              });
            },10000);

          });
        });
      });
    });
  } else {

    warning = 'Incorrect password.....';
    res.redirect('/dbpull');
  }
});

module.exports = router;
