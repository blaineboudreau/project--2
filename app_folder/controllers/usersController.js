// Dependencies
var express = require('express');
var router = express.Router();

// Models
var User = require('../models/users');

//Index route (GET)
router.get('/', function(req, res) {
  User.find(function(err, users) {
    res.render('users/show.ejs', {
      users: users
    });
  });
});// end Index

// Exporting router
module.exports = router;
