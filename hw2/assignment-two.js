/*Vuong Tran
 *Assignment 2
 *
 *This is an Express app to handle HTTP request and resspones. /gets, /posts, /puts, /deletes
 *are the 4 URN, each handling there HTTP methods
 */



var http = require('http');
var express = require('express');

// Creates an Express application
var app = express();

//base urn
app.all('/', function (req, res) {
	res.status(403).send('Request Rejected: no URN specified');
});

//get method
app.get('/gets', function (req, res) {
  if(Object.keys(req.query).length > 0) {
    res.send(req.query);
  } else {
    res.send('No query parameters.');
  }
});

//post method
app.post('/posts', function (req, res) {
  if(Object.keys(req.query).length > 0) {
    res.send(req.query);
  } else {
    res.send('No query parameters.');
  }
});

//put method
app.put('/puts', function (req, res) {
  if(Object.keys(req.query).length > 0) {
      res.send(req.query);
    } else {
      res.send('No query parameters.');
    }
});

//delete method
app.delete('/deletes', function (req, res) {
  if(Object.keys(req.query).length > 0) {
    res.send(req.query);
  } else {
    res.send('No query parameters.');
  }
});

//catch all
app.all('*', function (req, res) {
  res.status(403).send('Request Rejected: URN does not support the HTTP Method.');
});

//app listsen port 3000
var server = app.listen(3000, function() {
	console.log('Node.js server listening on port 3000')
});
