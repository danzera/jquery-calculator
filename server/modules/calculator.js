// import express
var express = require('express');
// unpack (?) express router functionality
var router = express.Router();
// import path functionality
var path = require('path');
// import custom calculation module
var calculation = require('./modules/calculation.js');

// 'calculator' 'POST' request
router.post('/', function(req, res) {
  console.log('/calculator POST hit in calculator.js router');
  // pull calculation object from req.body
  var calc = req.body;
  // calculate result
  var result = calculation(calc).toString();
  // send result back to the client
  res.send(result);
}); // END '/calculator' 'POST' request

// export router functionality
module.exports = router;
//
// function calculation(calc) {
//   var x = parseInt(calc.numOne);
//   var y = parseInt(calc.numTwo);
//   var operation = calc.operator;
//   var result;
//
//   switch (operation) {
//     case 'add':
//       result = x + y;
//       break;
//     case 'subtract':
//       result = x - y;
//       break;
//     case 'multiply':
//       result = x * y;
//       break;
//     case 'divide':
//       result = x / y;
//       break;
//     default:
//       result = "something went wrong";
//   }
//   return result;
// }
