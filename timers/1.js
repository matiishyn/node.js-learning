const http = require('http');

const server = http.createServer((req, res) => {
    res.end('info');
}).listen(3000);

setTimeout(() => {
    server.close();
    // server.close(process.exit.bind(this));
}, 2500);

const timer = setInterval(() => {
    console.log(process.memoryUsage());
}, 1000);
timer.unref();
// timer.ref();