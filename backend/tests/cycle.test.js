const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { Cycle } = require('../src/models')
const { KEY } = require('./utils.js')
require('./mongo_utils')

beforeEach(async () => {
  await Cycle.deleteMany()
})

describe('App can run', done => {
  it('returns status 200', async () => {
    const res = await request(app)
      .get(`/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /cycle', () => {
  it('should get all cycles', async () => {
    const res = await request(app)
      .get(`/cycle?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.be.an('array')
  })
})

describe('GET /cycle/:cycleId', () => {
  it('should get a cycle by ID', async () => {
    const cycle = new Cycle({
      term: 'FA19',
      chapter: 'UIUC'
    })
    await cycle.save()
    const res = await request(app)
      .get(`/cycle/${cycle._id}?key=${KEY}`)
      .expect(200)
    expect(res.body.result.term).to.eq('FA19')
  })
})

describe('POST /cycle', () => {
  it('should create a cycle', async () => {
    const cycle = new Cycle({
      term: 'FA19',
      chapter: 'UIUC'
    })
    await cycle.save()

    const res = await request(app)
      .post(`/cycle?key=${KEY}`)
      .send(cycle)
      .expect(200)
  })
})
