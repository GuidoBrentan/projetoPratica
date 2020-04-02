const express = require('express');
const app = express();
const rotas = require('../app/rotas.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../paginas'));
app.use(express.static('paginas'));
app.use(bodyParser.json());

//acrescentando informacoes de cabecalho para suportar o CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PATCH, DELETE");
    next();
  });

// passar como parâmetro para o módulo rotas.js
rotas(app);

module.exports = app;