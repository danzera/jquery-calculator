// import and unpack (?) express
var express = require('express');
var app = express();
// import path
var path = require('path');
// import body-parser
var bodyParser = require('body-parser');
// further requirement to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));
// set port
app.set('port', 4567);

// CUSTOM MODULES
// index module for base URL
var index = require('./modules/index.js');
var calculator = require('./modules/calculator.js');

// USES
// set default path
app.use(express.static('server/public'));
// use index module if base URL hit
app.use('/', index);
// use calculator module if '/calculator' route is hit
app.use('/calculator', calculator);

// listen on port
app.listen(app.get('port'), function() {
  console.log("We're live on port ", app.get('port'));
});
