var express = require('express');
var path = require('path');
var yelpRouter = require('./yelpRouter.js')

var port = 8080;

var app = express();

app.use(express.static(__dirname + './../client/public'));


app.use('/api', yelpRouter);
app.use('/api*', yelpRouter);

// send all requests to index.html so browserHistory in React Router works
// this needs to be below all other routes
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './../client/public/index.html'));
});


// app.get('/yelpApp', function(req, res) {
//   res.sendFile(path.join(__dirname, './../client/public/yelpApp.html'));
// });


app.listen(port, function () {
  console.log('Listening to port: ' + port);
});

