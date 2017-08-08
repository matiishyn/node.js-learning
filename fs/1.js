const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

    if (req.url === '/') {
        // const info = fs.readFileSync('index.html');
        // res.end(info);

        fs.readFile('index.html', (err, info) => {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.end('Server error');
                return false;
            }
            res.end(info);
        });
    }

}).listen(3000);