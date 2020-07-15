// this file connects to mongo and starts the express server
const app = require('./app')
const mongoose = require('mongoose')

// connect to mongoose
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

mongoose.connection
  .once('open', () => console.log('Connected to Mongo instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const API_PORT = process.env.PORT === undefined ? 8080 : process.env.PORT
// start server
app.listen(API_PORT, async () => console.log(`Server listening on port ${API_PORT}!`))

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('ERROR: unhandledRejection, did you run `dotenv` before yarn dev?', error.message)
  process.exit(1)
})

module.exports = app
