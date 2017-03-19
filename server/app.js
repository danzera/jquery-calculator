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
var calculator = require('./modules/calculator.js');
// ---END CUSTOM MODULES---

// set default path
app.use(express.static('server/public'));
// use index module if base URL hit
app.use('/', index);
// use calculator module if '/calculator' route is hit
app.use('/calculator', calculator);

// '/calculator' 'POST' request
app.post('/calculator', function(req, res) {
  console.log('/calculator path hit');
  var calculation = req.body;
  var result = calculator(calculation).toString();
  res.send(result);
}); // END '/calculator' 'POST' request

// listen on port
app.listen(app.get('port'), function() {
  console.log("We're live on port ", app.get('port'));
});

function calculator(calculation) {
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
