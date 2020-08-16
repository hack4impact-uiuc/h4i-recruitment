const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')
const app = require('../src/app')
const { Cycle, Workspace } = require('../src/models')
const { KEY } = require('./utils.js')
const { stubAuthUser } = require('./utils')
require('./mongo_utils')

beforeEach(async () => {
  await Cycle.deleteMany()
  await Workspace.deleteMany()
})

describe('GET /cycle', () => {
  it('should get all cycles', async () => {
    stubAuthUser({ workspaceIds: 'abc' })
    const res = await request(app)
      .get(`/api/cycle?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.be.an('array')
  })
})

describe('GET /cycle/id/:cycleId', () => {
  it('should get a cycle by ID', async () => {
    stubAuthUser({ workspaceIds: ['abc'] })
    const cycle = new Cycle({
      term: 'FA19',
      workspaceName: 'abc'
    })
    await cycle.save()
    const res = await request(app)
      .get(`/api/cycle/id/${cycle._id}?key=${KEY}`)
      .expect(200)
    expect(res.body.result.term).to.eq('FA19')
  })
})

describe('POST /cycle', () => {
  it('should create a cycle', async () => {
    stubAuthUser({ workspaceIds: 'abc' })
    const workspaceName = 'Hack4Impact University of Illinois at Urbana-Champaign'

    const workspace = new Workspace({
      name: workspaceName,
      owner: 'Owner'
    })
    await request(app)
      .post(`/api/workspaces?key=${KEY}`)
      .send(workspace)

    await request(app)
      .post(`/api/cycle?key=${KEY}`)
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
    stubAuthUser({ workspaceIds: workspaceName })
    const workspace = new Workspace({
      name: workspaceName
    })
    await request(app)
      .post(`/api/workspaces?key=${KEY}`)
      .send(workspace)

    await request(app)
      .post(`/api/cycle?key=${KEY}`)
      .send(
        new Cycle({
          term: 'FA18',
          workspaceName: workspaceName
        })
      )

    await request(app)
      .post(`/api/cycle?key=${KEY}`)
      .send(
        new Cycle({
          term: 'SP19',
          workspaceName: workspaceName
        })
      )

    const newCycle = await request(app).get(
      `/api/cycle/workspace/${workspaceName}?key=${KEY}&current=true`
    )

    const newCycleId = newCycle.body.result[0]._id
    const res = await request(app)
      .get(`/api/cycle/id/${newCycleId}?key=${KEY}`)
      .expect(200)
    expect(res.body.result.current).to.eq(true)
    expect(res.body.result.term).to.eq('SP19')

    const oldCycle = await request(app)
      .get(`/api/cycle/workspace/${workspaceName}?key=${KEY}&current=false`)
      .send({ current: false })
    expect(oldCycle.body.result[0].term).to.eq('FA18')
  })
})
