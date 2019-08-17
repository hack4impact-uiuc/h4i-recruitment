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
  role: 'Pending',
  tokenId: 'randomlyGeneratedString'
})

beforeEach(async () => {
  await User.deleteMany()
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
    expect(res.body.result[0].email).to.eq('fakeemail@gmail.com')
  })
})

describe('POST /user/', () => {
  it('should create a new user', async () => {
    await request(app)
      .post(`/user/?key=${KEY}`)
      .send(newUser)
      .expect(200)

    const databaseState = await User.find()
    expect(databaseState[0].email).to.eq('fakeemail@gmail.com')
  })
})

describe('PUT /user/:tokenId', () => {
  it('should update user to have new role', async () => {
    await newUser.save()
    const newRole = 'Member'
    await request(app)
      .put(`/user/${newUser.tokenId}?key=${KEY}`)
      .send(newRole)
      .expect(200)
  })
})
