// // import express
// var express = require('express');
// // unpack (?) express router functionality
// var router = express.Router();
// // import path functionality
// var path = require('path');

function calculation(calc) {
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
      result = "something went wrong";
  }
  return result;
}

// export calculation function
module.exports = calculation;
