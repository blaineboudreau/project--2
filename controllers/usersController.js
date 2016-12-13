// Dependencies
var express = require('express');
var users = express.Router();

// Models
var User = require('../models/users');

// Index route (GET)
// users.get('/', function(req, res) {
//   User.find(function(err, users) {
//     res.render('users/login.ejs', {
//       users: users
//     });
//   });
// });// end Index

// Create route (POST) creating user
// users.post('/', function(req, res) {
//     User.create(req.body, function(err, createdUser) {
//       req.session.loggedInUser = { name: createdUser.name, id: createdUser.id }
//       req.session.currentUser = createdUser.name;
//         res.redirect('/movies/show.ejs');
//     });
// }); // end create user

// (POST)
users.post('/', function(req, res) {
  User.findOne({ username: req.body.username}, function(err, foundUser) {
    if (req.body.password == foundUser.password) {
    req.session.currentUser = foundUser;
    res.redirect('/movies/show.ejs');
  } else {
    res.send('incorrect password')
  }
 });
}); // end login route

users.post('/', function(req, res){
    User.create(req.body, function(err, createdUser){
        res.redirect('/movies/show.ejs');
    });
});
// Exporting router
module.exports = users;
