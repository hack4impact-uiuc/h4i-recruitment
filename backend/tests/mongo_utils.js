const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

before(done => {
  mongoServer = new MongoMemoryServer()
  mongoServer.getConnectionString().then(mongoUri => {
    return mongoose.connect(mongoUri, {}, err => {
      if (err) {
        done(err)
      }
    })
  }).then(() => done())
})

after(() => {
  mongoose.disconnect()
  mongoServer.stop()
})