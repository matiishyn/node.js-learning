const fs = require('fs');

// create file
fs.writeFile('file.tmp', 'data', err => {
    if (err) throw err;

    // rename
    fs.rename('file.tmp', 'new.tmp', err => {
        if (err) throw err;

        // delete
        fs.unlink('new.tmp', err => {
            if (err) throw err;
        });
    });
});