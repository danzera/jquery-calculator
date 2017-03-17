// import and unpack (?) express
var express = require('express');
var app = express();
// import path
var path = require('path');
// import body-parser
var bodyParser = require('body-parser');
// set port
app.set('port', 4567);

// set default path
app.use(express.static('server/public'));
// serve up index file for base URL
app.get('/', function(req, res) {
  console.log('base URL hit');
  res.sendFile(path.resolve('server/public/views/index.html'));
});


// listen on port
app.listen(app.get('port'), function() {
  console.log('totes listening on port ', app.get('port'));
});
