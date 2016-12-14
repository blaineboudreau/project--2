// Mongoose required for model-building capabilities
var mongoose = require('mongoose');

// Constructor function property mongoose
var Schema = mongoose.Schema;

// Constructor Model (Schema)
var movieSchema = new Schema({
  title: String,
  director: String,
  description: String,
  stars: { type: Number, min: 0, max: 5 },
  img: String
});

// Movie, show collection in mongo
var Movie = mongoose.model('Movie', movieSchema);

// Exporting collection
module.exports = Movie;
