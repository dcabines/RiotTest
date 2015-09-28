var express = require('express');
var app = express();

app.use(express.static('.'));

var server = app.listen(3000, function () {
  var address = server.address();
  console.log('Listening on port %d', address.port);
});