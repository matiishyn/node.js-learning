const fs = require('fs');


fs.readFile('__filename', {encoding: 'utf-8'}, (err, data) => {
    // console.log(data); // <Buffer ...>
    // console.log(data.toString());   // string
    console.log(data);
    console.log(err);
});

fs.stat(__filename, (err, data) => {
    console.log(data.isFile());
    console.log(data);
});

