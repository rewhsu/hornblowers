var express = require('express');
var path = require('path');
var yelpRouter = require('./routers/yelpRouter');
var roomRouter = require('./routers/roomRouter');
var dbRouter = require('./routers/dbRouter');
var bodyParser = require('body-parser');
var session = require('express-session');


var port = 8080;

var app = express();

app.use(express.static(__dirname + './../client/public'));
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

app.use('/api/room', roomRouter);
app.use('/api/room*', roomRouter);
app.use('/api/yelp', yelpRouter);
app.use('/api/yelp*', yelpRouter);
app.use('/api/db', dbRouter);
app.use('/api/db*', dbRouter);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './../client/public/index.html'));
});


app.listen(port, function () {
  console.log('Listening to port: ' + port);
});

