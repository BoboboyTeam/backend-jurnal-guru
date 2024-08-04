const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes/index.js');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);
app.get('/', function(req, res) {
    res.send('Hello World');
});

module.exports = app;
