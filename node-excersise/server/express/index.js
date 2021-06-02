const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
    if (err) {
      throw err;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

app.get('/contact', (req, res) => {
  fs.readFile(path.join(__dirname, 'contact.html'), function (err, data) {
    if (err) {
      throw err;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

app.use((req, res) => {
  fs.readFile(path.join(__dirname, '404.html'), function (err, data) {
    if (err) {
      throw err;
    }
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

express.listen(3000, function () {
  console.log('Server is up and running');
});
