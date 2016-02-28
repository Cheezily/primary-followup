var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var responsesSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  traits1: String,
  traits2: String,
  traits3: String,
  issues: String,
  clarity: String,
  prefer: String,
  enthusiasm: String,
  peers: String,
  peer_enthusiasm: String,
  hillary_clinton_ideology: String,
  bernie_sanders_ideology: String,
  ted_cruz_ideology: String,
  donald_trump_ideology: String,
  john_kasich_ideology: String,
  ben_carson_ideology: String,
  marco_rubio_ideology: String,
  gender: String,
  pid: String,
  primary: String,
  ideology: String,
  race: String,
  income: String
});

var responses = mongoose.model('responses', responsesSchema);
module.exports = responses;
