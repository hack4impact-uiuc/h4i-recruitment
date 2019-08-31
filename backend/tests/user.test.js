const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { User } = require('../src/models')
const { KEY } = require('./utils.js')
require('./mongo_utils')

const newUser = new User({
  firstName: 'fake',
  lastName: 'name',
  email: 'fakeemail@gmail.com',
  userId: 'userId',
  role: 'Pending'
})

describe('App can run', done => {
  it('returns status 200', async () => {
    await request(app)
      .get(`/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /user/', () => {
  it('should get all users', async () => {
    await newUser.save()
    const res = await request(app)
      .get(`/user/?key=${KEY}`)
      .expect(200)
    expect(res.body.result[0].email).to.eq('m@t.com')
  })
})

describe('POST /user/', () => {
  it('should create a new user', async () => {
    await request(app)
      .post(`/user/?key=${KEY}`)
      .send(newUser)
      .expect(200)

    const foundUser = await User.findOne({ firstName: 'fake' })
    expect(foundUser.email).to.eq('fakeemail@gmail.com')
  })
})

describe('PUT /user/', () => {
  it('should update user to have new role', async () => {
    await newUser.save()
    const reqBody = {
      email: 'fakeemail@gmail.com',
      role: 'Member'
    }
    await request(app)
      .put(`/user/?key=${KEY}`)
      .send(reqBody)
      .expect(200)
  })
})
