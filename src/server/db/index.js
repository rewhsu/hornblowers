var Sequelize = require('sequelize');
var db = new Sequelize('eventplanner', 'root')


var User = db.define('User', {
	user_name: Sequelize.STRING,
	user_email: Sequelize.STRING,
	user_password: Sequelize.STRING,
	user_location: Sequelize.STRING
});


var Message = db.define('Message', {
	message_text: Sequelize.STRING
});

var Event = db.define('Event', {
	event_name: Sequelize.STRING
});

var Friendship = db.define('Friendship', {
	user_a: Sequelize.INTEGER,
	user_b: Sequelize.INTEGER
})

Event.hasMany(User);
Event.hasMany(Message);
User.hasMany(Message);
User.belongsToMany(User, {as: 'Friends', through: 'Friendship', foreignKey: 'user_a'});
User.belongsToMany(User, { as: 'Friends', through: 'Friendship', foreignKey: 'user_b'});


db
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

module.exports = db;
