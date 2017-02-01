var express = require('express');
var path = require('path');

var port = 8080;

var app = express();

var router = express.Router();

app.use('/', router);

app.use(express.static(__dirname + './../client/public'));

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './../client/public/index.html'));
});

router.get('/andrewisthebest', function(req, res) {
  res.sendFile(path.join(__dirname, './../client/public/rew.html'));
})

app.listen(port, function () {
  console.log('Listening to port: ' + port);
});

