// Dependencies
var express = require('express');
var app = express();
var session = require('express-session');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Port
var port = 3000;

// Databases
mongoose.connect('mongodb://localhost/movie_app');

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB is connected');

});// end db.once

// Controllers
var moviesController = require('./controllers/moviesController');
var usersController = require('./controllers/usersController');

// Middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(session({}));

app.use('/movies', moviesController);
app.use('/users', usersController);

// Root route
app.get('/', function(req, res) {
  res.redirect("/movies");
});

// Listerner
app.listen(port, function() {
  console.log("Running on port");
});
