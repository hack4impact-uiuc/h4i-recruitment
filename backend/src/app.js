/*
 * this file initializes the express object and sets up everything
 * this is so tests can import the app instead of importing index.js
 * which starts the server
 */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const helmet = require('helmet')
const passport = require('passport')
const { errorHandler, auth } = require('./middleware')
const routes = require('./routes')
const loginRoute = require('./api/login')
// Configure PassportJS
require('./middleware/passport')

const app = express()

// must be before routes
app.use(helmet())
app.use(cors())
app.use(require('cookie-parser')())
app.use(bodyParser.json({ limit: '50MB' }))
app.use(
  require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV !== 'production') {
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
}

// STDOUT log
app.use(morgan('dev'))
app.use('/login', loginRoute)
// verifies user
app.use(auth)

app.use('/api/', routes)

// must be at the end
app.use(errorHandler)

module.exports = app
