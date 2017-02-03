var express = require('express');
var mock_data_users = require('./../../../data/mock-data-users.json');

var roomRouter = express.Router();
module.exports = roomRouter;

roomRouter.route('/')
  .get(function(req, res) {
    res.send('this is the api endpoint for rooms');
  })

roomRouter.route('/mockUsers')
  .get(function(req, res) {
    res.send(mock_data_users);
  });