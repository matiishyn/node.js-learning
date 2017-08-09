const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

var ROOT = __dirname + '/public';

http.createServer((req, res) => {
    if (!checkAccess(req)) {
        res.statusCode = 403;
        res.end('Tell me secret');
        return false;
    }

    sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

const checkAccess = req => {
    return url.parse(req.url, true).query.secret === 'true';
};

const sendFileSafe = (filePath, res) => {
    try {
        filePath = decodeURIComponent(filePath);
    } catch (e) {
        res.statusCode = 400;
        res.end('Bad Request');
        return false;
    }

    if (~filePath.indexOf('\0')) {
        res.statusCode = 400;
        res.end('Bad Request');
        return false;
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) !== 0) {
        res.statusCode = 404;
        res.end('File not found');
        return false;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('File not found');
            return false;
        }
        sendFile(filePath, res);
    });
};

const sendFile = (filePath, res) => {
    fs.readFile(filePath, (err, content) => {
        if (err) throw err;

        const mime = require('mime').lookup(filePath);
        res.setHeader('Content-Type', mime + '; charset=utf-8');
        res.end(content);
    })
};