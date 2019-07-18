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
      workspaceName: 'Hack4Impact University of Illinois at Urbana-Champaign'
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
      workspaceName: 'Hack4Impact University of Illinois at Urbana-Champaign'
    })

    await request(app)
      .post(`/cycle?key=${KEY}`)
      .send(cycle)
      .expect(200)
  })
})

describe('POST /cycle more than once', () => {
  it('should update the current flag to when a new cycle is created', async () => {
    const workspaceName = 'Hack4Impact University of Illinois at Urbana-Champaign'

    await request(app)
      .post(`/cycle?key=${KEY}`)
      .send(
        new Cycle({
          term: 'FA18',
          workspaceName
        })
      )

    await request(app)
      .post(`/cycle?key=${KEY}`)
      .send(
        new Cycle({
          term: 'SP19',
          workspaceName
        })
      )

    const newCycle = await request(app)
      .get(`/cycle/workspace/${workspaceName}?key=${KEY}`)
      .send({ current: true })

    newCycleId = newCycle.body.result[0]._id

    const res = await request(app)
      .get(`/cycle/${newCycleId}?key=${KEY}`)
      .expect(200)

    expect(res.body.result.current).to.eq(true)
    expect(res.body.result.term).to.eq('SP19')

    const oldCycle = await request(app)
      .get(`/cycle/workspace/${workspaceName}?key=${KEY}`)
      .send({ current: false })
    expect(oldCycle.body.result[0].term).to.eq('FA18')
  })
})
