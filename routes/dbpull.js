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

var fields = ['userID', 'vote2', 'vote_other', 'why_no', 'why_yes', 'prefer2',
  'enthusiasm2', 'yourself2', 'sanders2', 'clinton2', 'trump2', 'kasich2',
  'cruz2', 'traits2_1', 'traits2_2', 'traits2_3', 'issues2', 'clarity2',
  'chance2', 'gen_elec', 'open_ended1', 'open_ended2', 'time'];


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
            fs.rename('./CSVoutput/dbDump.csv', './CSVoutput/dbDump.bak');
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
