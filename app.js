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

const geocode=require('./geocode/geocode')

geocode.geoCodeAddress(argv.a,(errorMessage,results)=>{
  if(errorMessage)
   { console.log(errorMessage);}
  else
    {
      console.log(JSON.stringify(results,undefined,2));
    }
});

