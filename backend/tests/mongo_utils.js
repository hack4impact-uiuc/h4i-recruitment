const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { User } = require('../src/models')

let mongoServer

before(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(
    mongoUri,
    {},
    err => {
      if (err) {
        return
      }
    }
  )

  await User.insertMany([
    {
      firstName: 'Member',
      lastName: 'Test',
      userId: 'member',
      email: 'm@t.com',
      key: 'member',
      role: 'Member',
      workspaceIds: 'abc'
    },
    {
      firstName: 'Lead',
      lastName: 'Test',
      userId: 'lead',
      email: 'l@t.com',
      key: 'lead',
      role: 'Lead',
      workspaceIds: 'abc'
    },
    {
      firstName: 'Director',
      lastName: 'Test',
      userId: 'director',
      email: 'd@t.com',
      key: 'director',
      role: 'Director',
      workspaceIds: 'abc'
    },
    {
      firstName: 'Tim',
      lastName: 'Ko',
      userId: 'timko',
      email: 'tim@h4i.com',
      role: 'Director',
      workspaceIds: 'abc'
    }
  ])
})

after(() => {
  mongoose.disconnect()
  mongoServer.stop()
})
