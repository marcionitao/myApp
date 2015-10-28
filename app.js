/// <reference path="typings/node/node.d.ts"/>

/**
 * Module dependencies.
 */

var express        = require('express');
var load           = require('express-load');
var mongoose       = require('mongoose');
var flash          = require('express-flash');

//VERSAO 4
var favicon 	     = require('serve-favicon');
var logger 		     = require('morgan');
var methodOverride = require('method-override');
var session 	     = require('express-session');
var bodyParser 	   = require('body-parser');
var multer         = require('multer');
var errorHandler   = require('errorhandler');
var cookie         = require('cookie-parser');
//var html           = require('html');

var app = express();

mongoose.connect('mongodb://localhost/waibtec', function(err){
  if (err){
    console.log('Erro ao conectar no mongodb: '+err);
  }
});

// all environments
app.set('views', __dirname + '/views'); //alterado
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multer());

app.use(cookie());

app.use(session({ resave: true,
  saveUninitialized: true,
  secret: 'uwotm8waibtec' }));

app.use(flash());

//app.use(app.router);
app.use(express.static(__dirname+'/public')); //alterado

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

load('models').then('controllers').then('routes').into(app);

//alterado
app.listen(3000, function(){
  console.log('Servidor rodando na porta 3000...');
});
