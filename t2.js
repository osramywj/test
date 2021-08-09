const request = require('request');

request({
  url: 'http://127.0.0.1:3020/timeout',
  timeout: 5000,
}, (err, response, body) => {
  console.log(err, body);
});
