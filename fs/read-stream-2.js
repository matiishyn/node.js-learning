const http = require('http');
const fs = require('fs');


new http.Server((req, res) => {
    if (req.url === '/big.txt') {
        const file = fs.createReadStream('big.txt');
        sendFile(file, res);
    }
}).listen(3000);

const sendFile = (file, res) => {

    const write = () => {
        const fileContent = file.read();                // read

        if (fileContent && !res.write(fileContent)) {   // send
            file.removeListener('readable', write);

            res.once('drain', () => {                   // wait
                file.on('readable', write);
                write();
            });
        }

    };

    file.on('readable', write);

    file.on('end', () => {
        res.end();
    });
};