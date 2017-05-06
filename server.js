'use strict';

var express = require('express');
var requestify = require('requestify');
var cors = require('cors');

// Constantes
var PORT = 8081;
var HOST = '127.0.0.1';

// App
var app = express();

var corsOptionsDelegate = function(req, callback){
  var corsOptions;
  
  corsOptions = { allowedHeaders: ['Content-Type']}; // reflect (enable) the requested origin in the CORS response
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Implementa Cross-Origin Resource Sharing 
app.options('/', cors(corsOptionsDelegate));

app.get('/teste', function (req, res) {
  res.send('app.bhsul.requisitor esta vivo!\n');
});

//POST
app.post('/', function(req, res) {
  if (req.body.url && req.body.url.length > 0) {
    console.log('URL ' + req.body.url);
    requestify.get(req.body.url)
    .then(function(response) {
      res.send(response.body())
    });
  }
  else
	res.status(400).send('URL vazia.');
});

app.listen(PORT);
console.log('Executando em http://localhost:'  + PORT);
module.exports = app;