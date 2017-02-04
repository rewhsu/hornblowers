var express = require('express');
var mock_data_users = require('./../../../data/mock-data-users.json');
var mock_data_messages = require('./../../../data/mock-data-messages.json');

var roomRouter = express.Router();
module.exports = roomRouter;

roomRouter.route('/')
  .get(function(req, res) {
    res.send('this is the api endpoint for rooms');
  })

roomRouter.route('/mock/users')
  .get(function(req, res) {
    res.send(mock_data_users);
  });

roomRouter.route('/mock/messages')
  .get(function(req, res) {
    res.send(mock_data_messages);
  });