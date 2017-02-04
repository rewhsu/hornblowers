var express = require('express');
var path = require('path');
var yelpRouter = require('./routers/yelpRouter');
var roomRouter = require('./routers/roomRouter');
var db = require('./db/index.js');
var bodyParser = require('body-parser');

var port = 8080;

var app = express();

app.use(express.static(__dirname + './../client/public'));


app.use('/api/room', roomRouter);
app.use('/api/room*', roomRouter);
app.use('/api/yelp', yelpRouter);
app.use('/api/yelp*', yelpRouter);


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', yelpRouter);


app.get('/api/friends', function(req, res) {
	// db.User.findAll({
	// 	where: {

	// 	}
	// })
})

app.post('/api/users', function(req, res) {
	console.log('RES DATA: ', req.body)
	db.User.findOne({
		where: {
			user_name: req.body.searchName
		}
	}).then(function(user) {
		console.log('USER from SIGNUP: ', user);
		if (user) {
			res.send(user)
		} else {
			res.send('Sorry, user not found. Please tell them to signup!')
		}
	})
});

app.post('/api/signup', function(req, res) {
	console.log('RES DATA from SIGNUP.js: ', req.body)
	// use findOne instead of findOrCreate because we're not using
	// 'where' to map to a unique index (creating duplicates)
	db.User.findOne({
		where: {
			user_name: req.body.name,
			user_email: req.body.email
		}
	}).then(function(user) {
		console.log('USER from SIGNUP: ', user);
		if (user) {
			res.send('You have already signed up. Please log in.')
		} else {
			db.User.create({
			  user_name: req.body.name,
			  user_email: req.body.email,
			  user_password: req.body.password,
			  user_streetaddress: req.body.streetaddress,
			  user_postalcode: req.body.postalcode
			}).then(function(user) {
				console.log('USER after create: ', user);
				res.json(user);
			})
		}
	})
})


app.post('/api/login', function(req, res) {
	console.log('REQ BODY: ', req.body.email)
	db.User.findOne({
		where: {
			user_email: req.body.email
			// user_password: req.body.password
		}
	}).then(function(user) {
		console.log('USER from LOGIN: ', user);
		if (user) {
			res.json(user)
		} else {
			res.send('Please try again') //send message or do nothing?
		}
	})
});

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

