exports.yelpSearch = function(cb, term, location, limit, radius) {

  const yelp = require('yelp-fusion');

  var clientId = 'KwoQ7nFpMoPgs-07quInDw';

  var clientSecret = 'uvzcOWS4Tff1GAoYFlngV7WbmQUxlJryi5LU5Kcy5X58MoBYHeXSVUcpRRHesFGS';

  var numResults = numResults || 10;

  const searchRequest = {
    term: term || "Restaurants",
    location: location || '944 Market St, san francisco, ca',
    // latitude: 34.25,
    // longitude: 119.41,
    limit: limit || 5,
    radius: radius || 3000
  };

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      const results = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(firstResult, null, 4);
      cb(results);
    });
  }).catch(e => {
    console.log(e);
  });
}