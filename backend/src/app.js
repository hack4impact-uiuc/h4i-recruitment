const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const querystring = require('querystring')
const { Candidate, Stats, Match } = require('./models')
const { getStats } = require('./utils')
const { errorWrap, errorHandler } = require('./middleware')
const cors = require('cors')
const routes = require('./routes')

const app = express()

// must be before routes
app.use(cors())
app.use(bodyParser.json())

app.use('/', routes)

// must be at the end
app.use(errorHandler)

module.exports = app
