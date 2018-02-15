const axios = require('axios');
const yargs=require('yargs');

const apiKey = 'b90ad57f8b9588c4c12312d8076ea199';

const argv = yargs.options({
    a: {
      alias: 'address',
      demand: true,
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoCodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new error('unable to find that address.');
  }
   // console.log(response.data);
    var lat = response.data.results[0].geometry.location.lat;
   var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
    var current = response.data.currently.temperature;
    var apparent = response.data.currently.apparentTemperature;
    console.log(`the current temperature is ${current},it feels like ${apparent}`);
}).catch((e)=>{
  if(e.code==='ENOTFOUND')
    console.log('unable to connect to API servers.');
  else
    console.log(e.message);
});