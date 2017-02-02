var exampleData =
  [
    {
      "user_id": 1,
      "user_name": "Melissa Henderson",
      "user_email": "mhenderson0@ow.ly",
      "user_password": "a2pmTvMrt",
      "user_latitude": 48.1212,
      "user_longitude": -1.603
    },
    {
      "user_id": 2,
      "user_name": "Amy Harvey",
      "user_email": "aharvey1@ehow.com",
      "user_password": "lIacCCOS",
      "user_latitude": 18.42693,
      "user_longitude": -64.62079
    },
    // {
    //   "user_id": 3,
    //   "user_name": "Sharon Burton",
    //   "user_email": "sburton2@deviantart.com",
    //   "user_password": "Bf8dyml1A",
    //   "user_latitude": 53.99006,
    //   "user_longitude": 18.16958
    // },
    // {
    //   "user_id": 4,
    //   "user_name": "Jeremy Flores",
    //   "user_email": "jflores3@discuz.net",
    //   "user_password": "nYTF6yxzt",
    //   "user_latitude": -8.0744,
    //   "user_longitude": 113.8305
    // }
  ];

var findCenterLatLng = function(data) {
  var latSum = 0;
  var lngSum = 0;
  var count = 0;
  for(var i = 0; i < data.length; i++) {
    latSum += data[i].user_latitude;
    lngSum += data[i].user_longitude;
    count++;
  }
  return {
    lat: latSum/count,
    lng: lngSum/count
  }
}

console.log(latLng(exampleData));