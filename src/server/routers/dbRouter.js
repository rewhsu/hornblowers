var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/index.js');
var session = require('express-session');
var NodeGeocoder = require('node-geocoder');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var dbRouter = express.Router();
module.exports = dbRouter;

var geocoder = NodeGeocoder({provider: 'google'});

dbRouter.use(bodyParser.urlencoded({ extended: true }))
dbRouter.use(bodyParser.json())


// FIND ALL USER'S FRIENDS BY USERID
dbRouter.get('/friends', function(req, res) {
  if (req.session.userId) {
    db.User.findAll({
      where: {id: req.session.userId},
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
  }
});


// ADD FRIENDS
dbRouter.post('/friends', function(req, res) {
// if req.body.members is an array of userIds + creatorId
var createFriends = function (userId, friendId) {
  var result = [];
    result.push(
      {user_a: userId, user_b: friendId},
      {user_a: friendId, user_b: userId}
    );
  return result;
};

var friendshipArr = createFriends(req.session.userId, req.body.friendId);

  if (req.session.userId) {
    db.Friendship.bulkCreate(friendshipArr)
      .then(function() {
        return db.Friendship.findAll({
          where: {
            user_a: req.session.userId
          }
        });
      }).then(function(friendship) {
        if (friendship) {
          res.send('Added new friend!')
        } else {
          res.send('no friends');
        };
      });
  } else {
    res.send('no friends');
  }
});


// FIND USER BY SEARCHED NAME
dbRouter.get('/users', function(req, res) {
  if (req.query.userId) {
    db.User.findOne({
      where: {
        id: req.query.userId
      }
    }).then(function(user) {
      if (user) {
        res.json(user)
      } else {
        res.send('Sorry, user not found.')
      }
    });
  } else if (req.query.searchName){
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
    
  }
});

// FIND ALL EVENTS FOR EACH USER
dbRouter.get('/events', function(req, res) {
  if (req.session.userId) {
    db.EventMember.findAll({
      where: {
        userId: req.session.userId
      }
    }).then(function(events) {
      if (events) {
        res.json(events)
      } else {
        res.send('User is not part of any events.')
      }
    });
  } else {
    // do nothing
  }
});

// CREATE EVENT WITH FRIENDS
dbRouter.post('/events', function(req, res) {
// if req.body.members is an array of userIds + creatorId
  if (req.session.userId) {
    var membersArray = req.body.members;
    membersArray.push(req.session.userId);

    var createMembers = function (array, eventId) {
      return array.map(function(memberId) {
        return {eventId: eventId, userId: memberId};
      })
    };

      db.Event.create({
        event_name: req.body.eventName,
        event_creatorId: req.session.userId
      }).then(function(event) {
        if (event) {
          req.session.eventId = event.dataValues.id;
          db.EventMember.bulkCreate(createMembers(membersArray, event.id))
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
  } else {
    // do nothing
  }
});

// FIND MEMBERS IN EVENT
dbRouter.get('/eventMembers', function(req, res) {
  db.EventMember
    .findAll({
      where: {
        eventId: req.session.eventId
      }
    }).then(function(members) {
      if (members) {
        res.json(members)
      } else {
        res.send('Event does not have members.')
      }
  })
});


// FIND MESSAGES FOR EACH EVENT CHATROOM
dbRouter.get('/messages', function(req, res) {
  db.Message.findAll({
    where: {
      eventId: 3
    }
  }).then(function(messages) {
    if (messages.length > 0) {
      res.json(messages)
    } else {
      res.send('No messages in event room.')
    }
  });
});

dbRouter.post('/messages', function(req, res) {
  db.Message.create({
      userId: req.body.userid,
      eventId: req.body.eventid,
      message_text: req.body.text
  }).then(function(message) {
    if (message) {
      res.json(message)
    } else {
      res.send('Empty message.')
    }
  });
});

// SIGNUP USER AND CONVERT ADDRESS TO LAT/LONG
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
      geocoder.geocode({
        address: req.body.streetaddress, 
        zipcode: req.body.postalcode
      }).then(function(result) {
          console.log('FORMATTED ADDRESS: ', result[0].formattedAddress)
          var latitude = result[0].latitude;
          var longitude = result[0].longitude;
          var formattedAddress = result[0].formattedAddress
          
          var encrypt = Promise.promisify(bcrypt.hash);
            encrypt(req.body.password, null, null)
              .then(function(hash) {
                var encrypted = hash;
                db.User.create({
                    user_name: req.body.name,
                    user_email: req.body.email,
                    user_password: encrypted,
                    user_address: formattedAddress,
                    user_lat: latitude,
                    user_lon: longitude
                }).then(function(user) {
                  res.json(user);
                })
              }).catch(function(err) {
                console.log('Error hashing pw: ', err);
              })              
        }).catch(function(err) {
          console.log('Error converting gps coord: ', err);
        });
    }
  });
});


dbRouter.post('/login', function(req, res) {
  db.User.findOne({
    where: {
      user_email: req.body.email
    }
  }).then(function(user) {
    console.log('user', user);

    if (user) {
      var password = user.dataValues.user_password;
      var comparePW = Promise.promisify(bcrypt.compare);
      comparePW(req.body.password, password)
        .then(function(match) {
          if (match) {
            req.session.userId = user.dataValues.id; 
            user.dataValues.sessionid = req.session.id;
            res.json(user);
          } else {
            res.send('Incorrect password. Please try again.');
          }
        })
        .catch(function(err) {
          console.log('Error decrypting pw: ', err);
        })     
    } else {
      res.send('Cannot find user.');
    }
  });  
});



dbRouter.post('/check', function(req, res) {
  res.send(200, req.session.userId);

})









