const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { User } = require('../src/models')
const { KEY } = require('./utils.js')
require('./mongo_utils')

const newUser = new User({
  email: 'fakeemail@gmail.com',
  role: 'Pending',
  tokenId: 'randomlyGeneratedString'
})

beforeEach(async () => {
  await Event.deleteMany()
})

describe('App can run', done => {
  it('returns status 200', async () => {
    await request(app)
      .get(`/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /users/', () => {
  it('should get all users', async () => {
    await newUser.save()
    const res = await request(app)
      .get(`/users/?key=${KEY}`)
      .expect(200)
    expect(res.body.result.email).to.eq('fakeemail@gmail.com')
  })
})

describe('POST /users/', () => {
  it('should create a new user', async () => {
    await request(app)
      .post(`/users/?key=${KEY}`)
      .send(newUser)
      .expect(200)
  })
})

describe('PUT /users/:tokenId', () => {
  it('should update user to have new role', async () => {
    await newUser.save()
    const newRole = 'Member'
    await request(app)
      .put(`/users/${newUser.tokenId}?key=${KEY}`)
      .send(newRole)
      .expect(200)
  })
})
