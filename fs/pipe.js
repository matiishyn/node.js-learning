const http = require('http');
const fs = require('fs');


new http.Server((req, res) => {
    if (req.url === '/big.txt') {
        const file = fs.createReadStream('big.txt');
        sendFile(file, res);
    }
}).listen(3000);

const sendFile = (file, res) => {
    file.pipe(res);

    file.on('error', err => {
        res.statusCode = 500;
        res.end('Server error');
        console.log(err);
    });

    file
        .on('open', () => {
            console.log('open');
        })
        .on('close', () => {
            console.log('close');
        });

    // connection was interrupted
    res.on('close', () => {
        file.destroy();
    });
};