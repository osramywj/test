const cp = require('child_process');
const proc = cp.fork('./child.js');
proc.on('message', function(msg) {
  console.log(`parent got message: ${msg}`);
});
proc.send({ hello: 'world' });

