const fs = require('fs');

const stream = new fs.ReadStream('big.txt');

stream.on('readable', () => {
    const data = stream.read();
    // console.log(data);
    console.log(data.length);
});

stream.on('end', () => {
    console.log('end');
});

stream.on('error', err => {
    console.log(err);
});