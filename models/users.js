// mongoose required for model-building capabilities
var mongoose = require('mongoose');

// Require Movie to use in constructor
var Movie = require('./movies.js');

// Refers to the Schema constructor within mongoose
var Schema = mongoose.Schema;

// Invoke the constructor making Model for User
var userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  movieList: [Movie.schema]
});

// Model Method, takes two arguments: model name and schema
var User = mongoose.model('User', userSchema);

// Exporting collection
module.exports = User;
