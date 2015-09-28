var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/', function(req, res){
  res.send('/public/index.html');
});

var server = app.listen(3000, function () {
  var address = server.address();
  console.log('Listening on port %d', address.port);
});