const request = require('request');

const apiKey = 'b90ad57f8b9588c4c12312d8076ea199';

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        current: body.currently.temperature,
        apparent: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch the weather');
    }

  });
}
module.exports = {
  getWeather
};