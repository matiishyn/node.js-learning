const http = require('http');
const url = require('url');

const server = new http.Server();

server.listen(1337, '127.0.0.1');

server.on('request', (req, resp) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/echo' && parsedUrl.query.msg) {
        resp.end(parsedUrl.query.msg);
    } else {
        resp.statusCode = 404;
        resp.end('Not found');
    }
});