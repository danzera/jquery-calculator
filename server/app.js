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

// -----CUSTOM MODULES-----
// index module for base URL
var index = require('./modules/index.js');
// ---END CUSTOM MODULES---

// set default path
app.use(express.static('server/public'));
// use index module if base URL hit
app.use('/', index);

// // base URL 'GET' request
// app.get('/', function(req, res) {
//   console.log('base URL hit');
//   // serve up index.html file
//   res.sendFile(path.resolve('server/public/views/index.html'));
// }); // END base URL 'GET' request

// '/calculate' 'POST' request
app.post('/calculate', function(req, res) {
  console.log('/calculate path hit');
  var calculation = req.body;
  var result = calculate(calculation).toString();
  res.send(result);
}); // END '/calculate' 'POST' request

// listen on port
app.listen(app.get('port'), function() {
  console.log("We're live on port ", app.get('port'));
});

function calculate(calculation) {
  var x = parseInt(calculation.numOne);
  var y = parseInt(calculation.numTwo);
  var operation = calculation.operator;
  var result;

  switch (operation) {
    case 'add':
      result = x + y;
      break;
    case 'subtract':
      result = x - y;
      break;
    case 'multiply':
      result = x * y;
      break;
    case 'divide':
      result = x / y;
      break;
    default:
      result = "something went wrong";
  }
  console.log(result);
  return result;
}
