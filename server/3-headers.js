const http = require('http');
const url = require('url');

const server = new http.Server();

server.listen(1337, '127.0.0.1');

server.on('request', (req, resp) => {
    console.log(req.headers);

    resp.setHeader('Cache-control', 'no-cache');
    resp.end('no cache2');
});