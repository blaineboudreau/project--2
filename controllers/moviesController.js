// Dependencies
var express = require('express');
var movies = express.Router();

var Movie = require('../models/movies')
var User = require('../models/users');

// Index route (GET)
movies.get('/', function(req, res) {
 Movie.find(function(err, movie) {
  res.render('movies/index.ejs', {
     movie: movie
  });
 });
});

// New route (GET)
movies.get('/new', function(req, res) {
  res.render('movies/new.ejs');
});

// Create route (POST)
movies.post('/', function(req, res) {
  Movie.create(req.body,
    function(err, movie) {
     if (err) { console.log(err) }
    res.redirect('/movies');
  });
});

// Edit route (GET)
movies.get('/:id/edit',
 function(req, res) {
 Movie.findById(req.params.id,
  function(err, movie) {
 res.render('movies/edit.ejs', {
  movie:movie
  });
 });
});

// Update route (PUT)
movies.put('/:id', function(req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body,
    function(err, movie) {
    res.redirect('/movies/'+req.params.id);
  });
});

// Show route (GET)
movies.get('/:id', function(req, res) {
  Movie.findById(req.params.id,
    function(err, movie) {
    res.render('movies/show.ejs', {
      movie: movie
    });
  });
});

// Delete route (DELETE)
movies.delete('/:id', function(req, res) {
  Movie.findByIdAndRemove(req.params.id,
    function(err, movie) {
    res.redirect('/movies');
  });
});

// send button route



module.exports = movies;
