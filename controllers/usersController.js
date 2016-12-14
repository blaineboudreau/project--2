// Dependencies
var express = require('express');
var users = express.Router();

// Models
var User = require('../models/users');


users.get('/', function(req, res){
    res.render('users/login.ejs');
});


users.post('/', function(req, res) {
 User.create(req.body, function(err, newUser) {
  if (err) {
   console.log('user create error: ', err);
    res.redirect('/');
  } else {
   req.session.loggedInUser = { name: newUser.name, id: newUser.id }
   req.session.currentUser = newUser.name;
  }
   res.redirect('/movies');
 });
});


users.post('/login', function(req, res) {
 User.findOne({ name: req.body.name }, function(err, foundUser) {
  if (err) {
   console.log('user login error: ', err);
  }
  if (!foundUser) {
   res.redirect('/');
  } else if (foundUser.authenticate(req.body.password)) {
   req.session.loggedInUser = { name: foundUser.name, id: foundUser.id }
   req.session.currentUser = foundUser.name;
   res.redirect('/movies/new');
  } else {
   res.send('wrong password');
  }
 });
});


// Exporting router
module.exports = users;
