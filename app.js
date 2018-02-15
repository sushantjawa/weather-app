const request = require('request');
const yargs = require('yargs');
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

const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');

geocode.geoCodeAddress(argv.a,(errorMessage,results)=>{
  if(errorMessage)
   { console.log(errorMessage);}
  else
    {
      console.log(results.address);
      weather.getWeather(results.latitude,results.longitude,(err,results)=>{
        if(err){
          console.log(err);}
          else{
       console.log(`the current temperature is ${results.current},it feels like ${results.apparent}`);     
          }
      })
    }
});

