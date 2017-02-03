var express = require('express');
var yelp = require('./../../client/app/yelpSearch.js');

var router = express.Router();
module.exports = router;

router.route('/')
  .get(function(req, res) {
    yelp.yelpSearch(function(response) {
      console.log(response);
      res.send(response);
    })
  });

router.route('/*')
  .get(function(req, res) {
    // Sanitize data
    var termPatt = /[^\/].*(?=@)/g;
    var notTermPatt = /[\/].*@/g;
    var locPatt = /(?!.*@)%20/
    var term = req.url.match(termPatt)[0];
    var location = req.url.replace(notTermPatt, '');
    while(location.search(locPatt) > 0) {
      location = location.replace(locPatt, ' ');
    }
    // Search for santized inputs
    yelp.yelpSearch(function(response) {
      res.send(response);
    }, term, location);
  })