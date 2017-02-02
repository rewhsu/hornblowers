var express = require('express');
var yelp = require('./../client/app/yelp.js');

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
    var termPatt = /[^\/].*(?=@)/g;
    var notTermPatt = /[\/].*@/g;
    var locPatt = /(?!.*@)%20/
    var term = req.url.match(termPatt)[0];
    var location = req.url.replace(notTermPatt, '');
    // Sanitize data
    while(location.search(locPatt) > 0) {
      location = location.replace(locPatt, ' ');
    }
    yelp.yelpSearch(function(response) {
      res.send(response);
    }, term, location);
  })