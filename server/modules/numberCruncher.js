// import express -- UNNECESSARY IN THIS FILE?!
var express = require('express');
// unpack (?) express router functionality -- UNNECESSARY IN THIS FILE?!
var router = express.Router();
// import path functionality -- UNNECESSARY IN THIS FILE?!
var path = require('path');

function numberCrucher(calc) {
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

// export numberCrucher function
module.exports = numberCrucher;
