var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var responsesSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  vote2: String,
  vote_other: String,
  why_no: String,
  why_yes: String,
  prefer2: String,
  enthusiasm2: String,
  yourself2: String,
  sanders2: String,
  clinton2: String,
  trump2: String,
  kasich2: String,
  cruz2: String,
  traits2_1: String,
  traits2_2: String,
  traits2_3: String,
  issues2: String,
  clarity2: String,
  chance2: String,
  gen_elec: String,
  open_ended1: String,
  open_ended2: String,
  time: String
});

var responses = mongoose.model('responses', responsesSchema);
module.exports = responses;
