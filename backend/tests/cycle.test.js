const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { Cycle, Workspace } = require('../src/models')
const { KEY } = require('./utils.js')
require('./mongo_utils')

beforeEach(async () => {
  await Cycle.deleteMany()
  await Workspace.deleteMany()
})

describe('App can run', done => {
  it('returns status 200', async () => {
    await request(app)
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

describe('GET /cycle/id/:cycleId', () => {
  it('should get a cycle by ID', async () => {
    const cycle = new Cycle({
      term: 'FA19',
      workspaceName: 'abc'
    })
    await cycle.save()
    const res = await request(app)
      .get(`/cycle/id/${cycle._id}?key=${KEY}`)
      .expect(200)
    expect(res.body.result.term).to.eq('FA19')
  })
})

describe('POST /cycle', () => {
  it('should create a cycle', async () => {
    const workspaceName = 'Hack4Impact University of Illinois at Urbana-Champaign'

    const workspace = new Workspace({
      name: workspaceName,
      owner: 'Owner'
    })
    await request(app)
      .post(`/workspaces?key=${KEY}`)
      .send(workspace)

    await request(app)
      .post(`/cycle?key=${KEY}`)
      .send({
        term: 'FA19',
        workspaceName: 'abc'
      })
      .expect(200)
  })
})

describe('POST /cycle more than once', () => {
  it('should update the current attribute for cycles to when a new cycle is created', async () => {
    const workspaceName = 'Hack4Impact University of Illinois at Urbana-Champaign'

    const workspace = new Workspace({
      name: workspaceName
    })
    await request(app)
      .post(`/workspaces?key=${KEY}`)
      .send(workspace)

    await request(app)
      .post(`/cycle?key=${KEY}`)
      .send(
        new Cycle({
          term: 'FA18',
          workspaceName: 'abc'
        })
      )

    await request(app)
      .post(`/cycle?key=${KEY}`)
      .send(
        new Cycle({
          term: 'SP19',
          workspaceName: 'abc'
        })
      )

    const newCycle = await request(app).get(
      `/cycle/workspace/${workspaceName}?key=${KEY}&current=true`
    )
    newCycleId = newCycle.body.result[0]._id
    const res = await request(app)
      .get(`/cycle/id/${newCycleId}?key=${KEY}`)
      .expect(200)
    expect(res.body.result.current).to.eq(true)
    expect(res.body.result.term).to.eq('SP19')

    const oldCycle = await request(app)
      .get(`/cycle/workspace/${workspaceName}?key=${KEY}`)
      .send({ current: false })
    expect(oldCycle.body.result[0].term).to.eq('FA18')
  })
})
