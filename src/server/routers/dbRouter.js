var express = require('express');
var bodyParser = require('body-parser');

var dbRouter = express.Router();
module.exports = dbRouter;

dbRouter.use(bodyParser.urlencoded({ extended: true }))
dbRouter.use(bodyParser.json())


dbRouter.get('/api/db/friends', function(req, res) {
  db.User.findAll({
    where: {id: req.query.userid},
    include: [
      {model: db.User, as: 'Friends', through: db.Friendship}
    ]
  }).then(function(users) {
    if (users[0].Friends.length > 0) {
      res.send(users[0].Friends)
    } else {
      res.send('User does not have friends.')
    }
  })
})

dbRouter.get('/api/db/users', function(req, res) {
  console.log('REQ DATA: ', req)
  db.User.findOne({
    where: {
      user_name: req.query.searchName
    }
  }).then(function(user) {
    console.log('USER searchName: ', user);
    if (user) {
      res.send(user)
    } else {
      res.send('Sorry, user not found. Please tell them to signup!')
    }
  })
});

dbRouter.post('/api/db/signup', function(req, res) {
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


dbRouter.post('/api/db/login', function(req, res) {
  console.log('REQ BODY: ', req.body.email)
  db.User.findOne({
    where: {
      user_email: req.body.email,
      user_password: req.body.password
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