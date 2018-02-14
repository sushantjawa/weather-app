const request = require('request');

var geoCodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to google server');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find such address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latittude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }

  });
}
module.exports = {
  geoCodeAddress
};