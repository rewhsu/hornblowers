var express = require('express');
var path = require('path');
var cors = require('cors');
var yelpRouter = require('./yelpRouter.js')

var port = 8080;

var app = express();

app.use(cors());

app.use(express.static(__dirname + './../client/public'));


app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  return next();
});

app.use('/api', yelpRouter);
app.use('/api*', yelpRouter);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './../client/public/index.html'));
});

app.get('/andrewisthebest', function(req, res) {
  res.sendFile(path.join(__dirname, './../client/public/rew.html'));
});


app.listen(port, function () {
  console.log('Listening to port: ' + port);
});

