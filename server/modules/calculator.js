// import express
var express = require('express');
// unpack (?) express router functionality
var router = express.Router();
// import path functionality
var path = require('path');
// import custom numberCruncher module -- NOT WORKING
// getting Error: Cannot find module './numberCrucher.js'
// attempted using './modules/numberCrucher.js' below as well
// and got the same error message
// var numberCruncher = require('./numberCrucher.js');

// 'calculator' 'POST' request
router.post('/', function(req, res) {
  console.log('/calculator POST hit in calculator.js router');
  // pull numberCruncher object from req.body
  var calc = req.body;
  // calculate result
  var result = numberCruncher(calc).toString();
  // send result back to the client
  res.send(result);
}); // END '/calculator' 'POST' request

// export router functionality
module.exports = router;

function numberCruncher(calc) {
  var x = parseInt(calc.numOne);
  var y = parseInt(calc.numTwo);
  var operation = calc.operator;
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
      result = "calculator temporarily out of order";
  }
  return result;
}
