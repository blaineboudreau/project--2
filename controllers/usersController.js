// Dependencies
var express = require('express');
var users = express.Router();

// Models
var User = require('../models/users');

//Index route (GET)
users.get('/', function(req, res) {
  User.find(function(err, users) {
    res.render('users/show.ejs', {
      users: users
    });
  });
});// end Index

// Exporting router
module.exports = users;
