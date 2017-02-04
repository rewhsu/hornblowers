var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/index.js');

var dbRouter = express.Router();
module.exports = dbRouter;

dbRouter.use(bodyParser.urlencoded({ extended: true }))
dbRouter.use(bodyParser.json())

// FIND ALL USER'S FRIENDS BY USERID
dbRouter.get('/friends', function(req, res) {
  db.User.findAll({
    where: {id: req.query.userid},
    include: [
      {model: db.User, as: 'Friends', through: db.Friendship}
    ]
  }).then(function(users) {
    if (users[0].Friends.length > 0) {
      res.json(users[0].Friends)
    } else {
      res.send('User does not have friends.')
    }
  })
})

// FIND USER BY SEARCHED NAME
dbRouter.get('/users', function(req, res) {
  db.User.findOne({
    where: {
      user_name: req.query.searchName
    }
  }).then(function(user) {
    if (user) {
      res.json(user)
    } else {
      res.send('Sorry, user not found. Please tell them to signup!')
    }
  })
});

// FIND ALL EVENTS FOR EACH USER
dbRouter.get('/events', function(req, res) {
  db.EventMember.findAll({
    where: {
      userId: req.query.userId
    }
  }).then(function(events) {
    if (events) {
      res.json(events)
    } else {
      res.send('User is not part of any events.')
    }
  });
});

// CREATE EVENT WITH FRIENDS
dbRouter.post('/events', function(req, res) {
// if req.body.members is an array of userIds + creatorId
var createMembers = function (array, eventId) {
  var jsonArray = [];
  array.forEach(function(memberId) {
    jsonArray.push({eventId: eventId, userId: memberId});
  })
  return jsonArray;
}

  db.Event.create({
    event_name: req.body.eventName,
    event_creatorId: req.body.creatorId
  }).then(function(event) {
    if (event) {
      db.EventMember.bulkCreate(createMembers(req.body.members, event.id))
      .then(function() {
        return db.EventMember.findAll({
          where: {
            eventId: event.id
          }
        });
      }).then(function(members) {
        if (members) {
          res.json(members)
        } else {
          res.send('Event does not have members.')
        }
      })
    } else {
      res.send('No event');
    }
  })
});

// SIGNUP USER
dbRouter.post('/signup', function(req, res) {
  // use findOne instead of findOrCreate because we're not using
  // 'where' to map to a unique index (creating duplicates)
  db.User.findOne({
    where: {
      user_name: req.body.name,
      user_email: req.body.email
    }
  }).then(function(user) {
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
        res.json(user);
      })
    }
  })
})


dbRouter.post('/login', function(req, res) {
  console.log('REQ BODY: ', req.body.email)

  db.User.findOne({
    where: {
      user_email: req.body.email,
      user_password: req.body.password
    }
  }).then(function(user) {
    if (user) {
      res.json(user)
    } else {
      res.send('Please try again') //send message or do nothing?
    }
  })
});