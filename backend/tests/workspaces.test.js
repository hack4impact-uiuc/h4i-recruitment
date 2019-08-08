const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { Workspace } = require('../src/models')
const { KEY } = require('./utils.js')
require('./mongo_utils')

beforeEach(async () => {
  await Workspace.deleteMany()
})

describe('App can run', done => {
  it('returns status 200', async () => {
    await request(app)
      .get(`/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /workspace', () => {
  it('should get all workspaces', async () => {
    const res = await request(app)
      .get(`/workspaces?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.be.an('array')
  })
})

describe('GET POST Transfer /workspace', () => {
  it('should create a workspace, retrieve it based on workspace name and update owner', async () => {
    const workspaceName = 'Hack4Impact University of Illinois at Urbana-Champaign'
    const owner = 'Timothy Ko'
    const workspace = new Workspace({
      name: workspaceName,
      owner
    })

    await request(app)
      .post(`/workspaces?key=${KEY}`)
      .send(workspace)
      .expect(200)

    // verify db state
    let res = await request(app).get(`/workspaces/${workspace.name}?key=${KEY}`)
    expect(res.body.result[0].name).to.eq(workspaceName)
    expect(res.body.result[0].owner).to.eq(owner)

    const newOwner = 'Angad Garg'
    await request(app)
      .put(`/workspaces/transfer/${workspace.name}?key=${KEY}`)
      .send({ owner: newOwner })
      .expect(200)

    // verify db owner is updated
    res = await request(app).get(`/workspaces/${workspace.name}?key=${KEY}`)
    expect(res.body.result[0].name).to.eq(workspaceName)
    expect(res.body.result[0].owner).to.eq(newOwner)
  })
})
