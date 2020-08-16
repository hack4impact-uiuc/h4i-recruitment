const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')
const app = require('../src/app')
const { Workspace } = require('../src/models')
const { stubAuthUser } = require('./utils.js')
require('./mongo_utils')

beforeEach(async () => {
  await Workspace.deleteMany()
})

describe('GET /workspace', () => {
  it('should get all workspaces', async () => {
    stubAuthUser()
    const res = await request(app)
      .get(`/api/workspaces`)
      .expect(200)
    expect(res.body.result).to.be.an('array')
  })
})

describe('GET /workspace failure', () => {
  it('should not fail request because caller is not a director', async () => {
    stubAuthUser({ role: 'Member' })
    await request(app)
      .get(`/api/workspaces`)
      .expect(403)
  })
})

describe('GET POST Transfer /workspace', () => {
  it('should create a workspace, retrieve it based on workspace name and update owner', async () => {
    const originalOwnerId = stubAuthUser({
      firstName: 'Director',
      lastName: 'Test',
      userId: 'director',
      email: 'd@t.com',
      key: 'director',
      role: 'Director',
      workspaceIds: 'abc'
    })

    const workspaceName = 'Hack4Impact University of Illinois at Urbana-Champaign'
    const workspace = new Workspace({
      name: workspaceName
    })

    // The user 'Director Test' creates a workspace
    await request(app)
      .post(`/api/workspaces`)
      .send(workspace)
      .expect(200)

    // verify db state
    let res = await request(app).get(`/api/workspaces/${workspaceName}`)
    expect(res.body.result[0].name).to.eq(workspaceName)
    expect(res.body.result[0].owner).to.eq(originalOwnerId.id)

    // Stub user again but this time with the new workspace ID included to allow us to transfer ownership
    sinon.restore()
    stubAuthUser({
      firstName: 'Director',
      lastName: 'Test',
      userId: 'director',
      email: 'd@t.com',
      key: 'director',
      role: 'Director',
      workspaceIds: workspaceName
    })

    await request(app)
      .put(`/api/workspaces/addUser`)
      .send({ workspaceIds: workspaceName, userEmail: 'tim@h4i.com' })
      .expect(200)

    await request(app)
      .put(`/api/workspaces/transfer/${workspaceName}`)
      .send({ workspaceIds: workspaceName, userEmail: 'tim@h4i.com' })
      .expect(200)

    res = await request(app)
      .get(`/api/workspaces`)
      .expect(200)

    // verify db owner is updated (current user no longer has access)
    res = await request(app).get(`/api/workspaces/${workspaceName}`)
    expect(res.body.result).to.eql([])
  })
})
