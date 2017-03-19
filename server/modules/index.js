// import express
var express = require('express');
// unpack (?) express router functionality
var router = express.Router();
// import path functionality
var path = require('path');

// base URL 'GET' request
router.get('/', function(req, res) {
  console.log('base URL hit in index.js router');
  // serve up index.html file
  res.sendFile(path.resolve('server/public/views/index.html'));
}); // END base URL 'GET' request

// export router functionality
module.exports = router;
