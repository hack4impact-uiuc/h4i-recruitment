const mongoose = require('mongoose')

class MongoConnection {
  constructor() {
    if (MongoConnection._instance) {
      return MongoConnection._instance
    }
    MongoConnection._instance = this

    // connect to mongoose
    mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true }
    )

    this.connection = mongoose.connection

    this.connection
      .once('open', () => console.log('Connected to Mongo instance.'))
      .on('error', error => console.log('Error connecting to MongoLab:', error))
  }
}

module.exports = MongoConnection
