// import express
var express = require('express');
// unpack (?) express router functionality
var router = express.Router();
// import path functionality
var path = require('path');

// 'calculator' 'POST' request
router.post('/', function(req, res) {
  console.log('/calculator POST hit in calculator.js router');
  // pull calculation object from req.body
  var calculation = req.body;
  // calculate result
  var result = calculator(calculation).toString();
  // send result back to the client
  res.send(result);
}); // END '/calculator' 'POST' request

// export router functionality
module.exports = router;

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
  return result;
}
