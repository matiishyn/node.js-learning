const http = require('http');

const server = http.createServer((req, res) => {

    process.nextTick(() => {
        // async but before next request
    });

    setImmediate(() => {
        // next iteration, asap
    });
}).listen(3000);
