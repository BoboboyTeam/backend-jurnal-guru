if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require('express')
const app = express();
const routes = require('./routes/index.js')
const cors = require('cors')

app.use(cors())
//middleware body-parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)

module.exports = app