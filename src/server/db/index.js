var Sequelize = require('sequelize');
var mockUsers = require('../../../data/mock-data-users.json');
var mockMessages = require('../../../data/mock-data-messages.json');
var mockEvents = require('../../../data/mock-data-events.json');
var mockFriendships = require('../../../data/mock-data-friendships.json');
var mockEventMembers = require('../../../data/mock-data-eventmembers.json');


var db = new Sequelize('eventplanner', 'root', '', {
	define: {
		timestamps: true
	}
});

// ***MAKE SURE YOU HAVE A DATABASE CALLED EVENTPLANNER AND YOU 'USE EVENTPLANNER' IN MYSQL then...
// ***FIRST: COMMENT IN DB.SYNC() TO SAVE W/ NODEMON WATCHING (CREATE TABLES) 
// ***SECOND: COMMENT OUT TO PREVENT DELETING TABLE DATA AFTER POPULATING IT


// db.sync({ force: true })
//   .then(function(err) {
//     console.log('It worked!');
//   }, function (err) { 
//     console.log('An error occurred while creating the table:', err);
//   });


//***IF YOU WANT MOCK DATA: SEE BELOW FOR INSTRUCTIONS


var User = db.define('User', {
	user_name: Sequelize.STRING,
	user_email: Sequelize.STRING,
	user_password: Sequelize.STRING,
	user_address: Sequelize.STRING,
	user_lat: Sequelize.DECIMAL(10,7),
	user_lon: Sequelize.DECIMAL(10,7),
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal('NOW()')
	},
	updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
});


var Event = db.define('Event', {
	event_name: Sequelize.STRING,
	event_creatorId: Sequelize.INTEGER,
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal('NOW()')
	},
	updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
});


var Message = db.define('Message', {
	message_text: Sequelize.STRING,
	userId: Sequelize.INTEGER,
	eventId: Sequelize.INTEGER,
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal('NOW()')
	},
	updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
});


var Friendship = db.define('Friendship', {
	user_a: Sequelize.INTEGER,
	user_b: Sequelize.INTEGER,
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal('NOW()')
	},
	updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
});

Friendship.removeAttribute('id'); // No primary keys in friendship table
// Friendship.sync({force: true});

var EventMember = db.define('EventMember', {
	eventId: Sequelize.INTEGER,
	userId: Sequelize.INTEGER,
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal('NOW()')
	},
	updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
})

EventMember.removeAttribute('id'); // No primary keys in eventmember table


Event.belongsTo(User, {foreignKey: 'event_creatorId'});
Message.belongsTo(User, {foreignKey: 'userId'});
Message.belongsTo(Event, {foreignKey: 'eventId'});
EventMember.belongsTo(User, {as: 'Members', foreignKey: 'userId'});
EventMember.belongsTo(Event, {as: 'Events', foreignKey: 'eventId'});
Friendship.belongsTo(User, {as: 'Friend_a', foreignKey: 'user_b', otherKey: 'user_a'});
Friendship.belongsTo(User, {as: 'Friend_b', foreignKey: 'user_a', otherKey: 'user_b'});


//***IF YOU WANT MOCK DATA: UNCOMMENT AND SAVE AFTER CREATING TABLES W/ DB.SYNC() ^^ 
// COMMENT OUT AFTER SAVING (POPULATING TABLES) TO PREVENT DUPLICATES

// User.bulkCreate(mockUsers, { ignoreDuplicates: true }).then(function() { // Notice: There are no arguments here, as of right now you'll have to...
//   return User.findAll();
// }).then(function(users) {
// 	Event.bulkCreate(mockEvents, { ignoreDuplicates: true }).then(function() { 
// 	  return Event.findAll();
// 	}).then(function(events) {
// 	  
// Message.bulkCreate(mockMessages, { ignoreDuplicates: true }).then(function() { // ***Issue assigning userId/EventId when bulkCreate, insert works
// 		  return Message.findAll();
// 		})
// .then(function(messages) {

// 		  Friendship.bulkCreate(mockFriendships, { ignoreDuplicates: true }).then(function() { 
// 		    return Friendship.findAll();
// 		  }).then(function(friendships) {
// 		    EventMember.bulkCreate(mockEventMembers, { ignoreDuplicates: true }).then(function() { 
// 		      return EventMember.findAll();
// 		    }).then(function(members) {
// 		      console.log('**COMPLETE INSERTING MOCK DATA**') 
// 		    }).catch(function(err) {
// 		    	console.log('Error inserting eventmembers into db: ', err);
// 		    });
// 		  }).catch(function(err) {
// 		  	console.log('Error inserting friendships into db: ', err);
// 		  });
// 		})
// 	});
// });

module.exports = {
	User: User,
	Event: Event,
	Message: Message,
	Friendship: Friendship,
	EventMember: EventMember
}
