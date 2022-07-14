var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  index: Number,
});

module.exports = mongoose.model("User", userSchema);
