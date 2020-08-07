const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { User } = require('../src/models')
const { KEY } = require('./utils.js')
require('./mongo_utils')

describe('App can run', done => {
  it('returns status 200', async () => {
    await request(app)
      .get(`/api/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /user/', () => {
  it('should get all users', async () => {
    const newUser = new User({
      firstName: 'fake',
      lastName: 'name',
      email: 'fakeemail@gmail.com',
      userId: 'userId',
      role: 'Pending'
    })
    await newUser.save()
    const res = await request(app)
      .get(`/api/user/?key=${KEY}`)
      .expect(200)
    expect(res.body.result[0].email).to.eq('m@t.com')
  })
})

describe('POST /user/', () => {
  it('should create a new user', async () => {
    const newUser = new User({
      firstName: 'fake',
      lastName: 'name',
      email: 'fakeemail2@gmail.com',
      userId: 'userId2',
      role: 'Pending'
    })

    await request(app)
      .post(`/api/user/?key=${KEY}`)
      .send(newUser)
      .expect(200)

    const foundUser = await User.findOne({ firstName: 'fake' })
    expect(foundUser.email).to.eq('fakeemail@gmail.com')
  })
})

describe('PUT /user/', () => {
  it('should update user to have new role', async () => {
    const reqBody = {
      email: 'fakeemail@gmail.com',
      role: 'Member'
    }
    await request(app)
      .put(`/api/user/?key=${KEY}`)
      .send(reqBody)
      .expect(200)
  })
})
