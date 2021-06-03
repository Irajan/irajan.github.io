const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    const filePath = path.join(__dirname,'index.html')
    res.sendFile(filePath);
});

app.get('/contact', (req, res) => {
    const filePath = path.join(__dirname,'contact.html')
    res.sendFile(filePath);
});

app.use((req, res) => {
  const filePath = path.join(__dirname,'404.html') 
  res.status(404).sendFile(filePath);
  });

app.listen(3000, function () {
  console.log('Server is up and running');
});
