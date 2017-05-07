'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var requestify = require('requestify');
var cors = require('cors');

// Constantes
var PORT = 8081;
var HOST = '127.0.0.1';

// App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

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
  if (req.body.endereco && req.body.endereco.length > 0) {
    requestify.headers = {'User-Agent': 'Mozilla/5.0'};//Dominio planalto.gov.br exige user agent.
    requestify.get(req.body.endereco)
    .then(function(response) {
      res.send(response.body);
    })
    .fail(function (response) {
      console.log('Erro ao carregar dado.', response.getCode());
    });
  }
  else
	  res.status(400).send('URL vazia.');
});

app.listen(PORT);
console.log('Executando em http://localhost:'  + PORT);
module.exports = app;