
// Dependencies
var express = require('express');
var app = express();
var session = require('express-session');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Port
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/movie_app'

// Databases
mongoose.connect(mongoDBURI);

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
app.use(express.static('public'));
app.use(session({
      secret: "secretsession",
      resave: false,
      saveUninitialized: false
}));

app.use('/movies', isLoggedIn, moviesController);
app.use('/users', usersController);

// ******* using thoms code for encrypted password******
// CUSTOM MIDDLEWARE
// Check if a user is logged in (used for '/movies..' route)
function isLoggedIn(req, res, next) {
  if (req.session.loggedInUser) {
    return next();
  } else {
    res.redirect('/');
  }
}

// Root route
app.get('/', function(req, res) {
  res.redirect("/users");
});

// // LOGOUT
// // GET /logout
// app.get('/logout', function(req, res) {
//   req.session.destroy(function(err) {
//     if (err) {
//       console.log('error destroying session: ', req.session);
//     } else {
//       res.redirect('/signup');
//     }
//   });
// });

// Listerner
app.listen(port, function() {
  console.log("Running on port");
});
