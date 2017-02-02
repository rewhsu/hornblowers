exports.yelpSearch = function(cb, term, location) {

  const yelp = require('yelp-fusion');

  var clientId = 'KwoQ7nFpMoPgs-07quInDw';

  var clientSecret = 'uvzcOWS4Tff1GAoYFlngV7WbmQUxlJryi5LU5Kcy5X58MoBYHeXSVUcpRRHesFGS';

  const searchRequest = {
    term: term || "falafel",
    location: location || '944 Market St, san francisco, ca'
  };

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
      cb(firstResult);
    });
  }).catch(e => {
    console.log(e);
  });
}