const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, 'public');

//app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('public/index.html' , { root : __dirname});
});

app.listen(3000, () => {
  console.log('Server is up!');
});