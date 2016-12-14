// mongoose required for model-building capabilities
var mongoose = require('mongoose');
// require encryption
var bcrypt = require('bcrypt');
// Require Movie to use in constructor
var Movie = require('./movies.js');

// Refers to the Schema constructor within mongoose
var Schema = mongoose.Schema;

// Invoke the constructor making Model for User
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  movieList: [Movie.schema]
});

// Functionality for storing password
// PASSWORD HASHING AND AUTHENTICATION

// Before each save of the user, check if the password has been added or modified,
// and if it has, hash the provided password and store it.
// Used at signup / creating a user.
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) { return next(); }
  var hashedPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  this.password = hashedPassword;
  next();
});

// Method for comparing the provided password with the stored hashed password.
// Used at login / authenticating a user.
userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
}

// Model Method, takes two arguments: model name and schema
var User = mongoose.model('User', userSchema);

// Exporting collection
module.exports = User;
