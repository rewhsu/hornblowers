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


var User = db.define('User', {
	user_name: Sequelize.STRING,
	user_email: Sequelize.STRING,
	user_password: Sequelize.STRING,
	user_streetaddress: Sequelize.STRING,
	user_postalcode: Sequelize.STRING,
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


User.belongsToMany(Event, {as: 'Members', through: 'EventMember', foreignKey: 'userId'});
Event.belongsToMany(User, {as: 'Events', through: 'EventMember', foreignKey: 'eventId'});
Event.belongsTo(User, {foreignKey: 'event_creatorId'});
Message.belongsTo(User, {foreignKey: 'userId'});
Message.belongsTo(Event, {foreignKey: 'eventId'});
User.belongsToMany(User, {as: 'Friends', through: 'Friendship', foreignKey: 'user_a', otherKey: 'user_b'});


// ***FIRST: COMMENT OUT DB.SYNC() AFTER CREATING TABLES TO PREVENT TABLE DATA DELETION

// db.sync({ force: true })
//   .then(function(err) {
//     console.log('It worked!');
//   }, function (err) { 
//     console.log('An error occurred while creating the table:', err);
//   });


//***IF YOU WANT MOCK DATA: UNCOMMENT EACH bulkCreate ONE-BY-ONE AND RUN AFTER CREATING TABLES W/ DB.SYNC() BELOW

// User.bulkCreate(mockUsers).then(function() { // Notice: There are no arguments here, as of right now you'll have to...
//   return User.findAll();
// }).then(function(users) {
//   console.log(users) // ... in order to get the array of user objects
// });

// Event.bulkCreate(mockEvents).then(function() { 
//   return Event.findAll();
// }).then(function(events) {
//   console.log(events) 
// });

// Message.bulkCreate(mockMessages).then(function() { // ***Issue assigning userId/EventId when bulkCreate, insert works
//   return Message.findAll();
// }).then(function(messages) {
//   console.log(messages) 
// })

// Friendship.bulkCreate(mockFriendships).then(function() { 
//   return Friendship.findAll();
// }).then(function(friendships) {
//   console.log(friendships) 
// }).catch(function(err) {
// 	console.log('Error inserting friendships into db: ', err);
// });

// EventMember.bulkCreate(mockEventMembers).then(function() { 
//   return EventMember.findAll();
// }).then(function(members) {
//   console.log(members) 
// }).catch(function(err) {
// 	console.log('Error inserting eventmembers into db: ', err);
// });


module.exports = {
	User: User,
	Event: Event,
	Message: Message,
	Friendship: Friendship,
	EventMember: EventMember
}
