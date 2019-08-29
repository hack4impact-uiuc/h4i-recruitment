const mongoose = require('mongoose')
const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { InterviewAvailability } = require('../src/models')
const { KEY } = require('./utils.js')
require('./mongo_utils')

beforeEach(async () => {
  await InterviewAvailability.deleteMany()
})

describe('App can run', done => {
  it('returns status 200', async () => {
    const res = await request(app)
      .get(`/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /interviews', () => {
  it('should get (an empty list of) all interviews', async () => {
    const res = await request(app)
      .get(`/schedule/?key=${KEY}`)
      .expect(200)
    expect(res.body.result.interviews).to.be.an('array')
    expect(res.body.result.interviews).to.have.length(0)
  })
})

describe('DELETE /interviews', () => {
  it('should successfully delete the (empty list of) interviews', async () => {
    const res = await request(app)
      .delete(`/schedule/?key=${KEY}`)
      .expect(200)
    expect(res.body.message).to.contain('Deleted')
  })
})

// Integration with some sample test data
describe('Mock future interviews', () => {
  it('should populate with some mock data', async () => {
    const res = await request(app)
      .post(`/schedule/populateTest/?key=${KEY}`)
      .expect(200)
    expect(res.body.message).to.contain('Populated')
  })

  it('should get a non-empty list of interviews', async () => {
    const res = await request(app)
      .get(`/schedule/?key=${KEY}`)
      .expect(200)
    expect(res.body.result.interviews).to.have.length(2)
  })

  it('should successfully delete the nonempty list', async () => {
    const res = await request(app)
      .delete(`/schedule/?key=${KEY}`)
      .expect(200)
    expect(res.body.message).to.contain('Deleted')
  })

  it('should get an empty list of interviews', async () => {
    const res = await request(app)
      .get(`/schedule/?key=${KEY}`)
      .expect(200)
    expect(res.body.result.interviews).to.have.length(0)
  })
})
