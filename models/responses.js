var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var responsesSchema = new Schema({
  timeID: String,
  traits1: String,
  traits2: String,
  traits3: String,
  issues: String,
  clarity: String,
  prefer: String,
  enthusiasm: String,
  peers: String,
  peer_enthusiasm: String,
  gender: String,
  pid: String,
  primary: String,
  ideology: String,
  race: String,
  income: String
});

var responses = mongoose.model('responses', responsesSchema);
module.exports = responses;
