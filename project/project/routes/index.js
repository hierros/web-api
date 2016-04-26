var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('movies', ['movies', 'reviews']);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IMDb Lite' });
});

router.get('/movies', function(req, res, next) {
  res.render('movies', { title: 'IMDb Lite' });
});

router.get('/movieslist', function(req, res, next) {
  db.movies.find(function(err, docs) {
    res.json(docs);
  });
});

router.post('/movies', function(req, res, next) {
  db.movies.insert(req.body, function(err, doc){
    console.log(req.body);
    res.json(doc);
  });
});

router.delete('/movies/:id', function(req, res, next) {
  var id = req.params.id;
  db.movies.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, doc){
    res.json(doc);
  });
});

router.get('/movies/:id', function(req, res, next) {
  var id = req.params.id;
  db.movies.findOne({
    _id: mongojs.ObjectId(id)
  }, function(err, doc){
    res.json(doc);
  });
});

router.get('/reviews', function(req, res, next) {
  res.render('reviews', { title: 'IMDb Lite' });
});

router.post('/reviews', function(req, res, next) {
  db.reviews.insert(req.body, function(err, doc){
    res.json(doc);
  });});

router.delete('/reviews/:id', function(req, res, next) {
  var id = req.params.id;
  db.reviews.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, doc){
    res.json(doc);
  });
});
module.exports = router;
