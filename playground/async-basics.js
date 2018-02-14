console.log('starting app');

setTimeout(() => {
  console.log('timeout')
},2000);

setTimeout(() => {
  console.log('timeout 2')
},0);
console.log('finishing up');

