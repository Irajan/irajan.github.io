const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
      if (err) {
        throw err;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/about') {
    fs.readFile(path.join(__dirname, 'aboutUs.html'), function (err, data) {
      if (err) {
        throw err;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    fs.readFile(path.join(__dirname, '404.html'), function (err, data) {
      if (err) {
        throw err;
      }
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

server.listen(3000, function () {
  console.log('Server is up and running');
});
