const http = require('http');
const port = 3020;

const server = http.createServer((request, response) => {
    console.log('request url: ', request.url);

    if (request.url === '/timeout') {
        response.end('OK!');
    }
}).listen(port);

console.log('server listening on port ', port);