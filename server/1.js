const http = require('http');

const server = new http.Server();

server.listen(1337, '127.0.0.1');

let counter = 0;

const emit = server.emit;
server.emit = (evt, ...args) => {
    console.log(evt);
    emit.apply(server, [evt, ...args]);
};

server.on('request', (req, resp) => {
    resp.end('hi, c=' + ++counter);
});