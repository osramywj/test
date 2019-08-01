
process.on('message', function(msg) {
  console.log(`child got message: ${msg}`);
});
process.send({ foo: 'bar' });

