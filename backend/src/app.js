const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const { errorHandler } = require('./middleware')
const routes = require('./routes')

const app = express()

console.log("HERE IS TEST KEY",process.env.TEST_KEY_JSON);
console.log("HERE IS KEY",process.env.KEY_JSON);
process.env['CURR_KEY_JSON'] = process.env.NODE_ENV === 'test'? process.env.TEST_KEY_JSON: process.env.KEY_JSON
console.log("HERE IS CURR KEY",process.env.CURR_KEY_JSON);

// must be before routes
app.use(cors())
app.use(bodyParser.json())

// Setup logging
const logDirectory = path.join(__dirname, 'logs')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(logDirectory, 'h4i-recruitment.log'), {
  flags: 'a'
})

// rotating file log
app.use(morgan('combined', { stream: accessLogStream }))
// STDOUT log
app.use(morgan('dev'))

app.use('/', routes)

// must be at the end
app.use(errorHandler)

module.exports = app
