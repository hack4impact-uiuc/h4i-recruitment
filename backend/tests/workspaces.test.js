const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { User, Workspace } = require('../src/models')
const { KEY, NONLEAD_KEY } = require('./utils.js')
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

describe('GET /workspace failure', () => {
  it('should not fail request because caller is not a director', async () => {
    await request(app)
      .get(`/workspaces?key=${NONLEAD_KEY}`)
      .expect(403)
  })
})

describe('GET POST Transfer /workspace', () => {
  it('should create a workspace, retrieve it based on workspace name and update owner', async () => {
    const workspaceName = 'Hack4Impact University of Illinois at Urbana-Champaign'
    const workspace = new Workspace({
      name: workspaceName
    })

    // The user 'Director Test' creates a workspace
    await request(app)
      .post(`/workspaces?key=${KEY}`)
      .send(workspace)
      .expect(200)

    let userRequest = await request(app).get(`/user/?key=${KEY}`)

    const originalOwnerId = userRequest.body.result.filter(user => {
      return user.email == 'd@t.com'
    })

    // verify db state
    let res = await request(app).get(`/workspaces/${workspace.name}?key=${KEY}`)
    expect(res.body.result[0].name).to.eq(workspaceName)
    expect(res.body.result[0].owner).to.eq(originalOwnerId[0]._id)

    await request(app)
      .put(`/workspaces/addUser?key=${KEY}`)
      .send({ workspaceId: workspaceName, userEmail: 'tim@h4i.com' })
      .expect(200)

    userRequest = await request(app).get(`/user/?key=${KEY}`)
    const newOwnerId = userRequest.body.result.filter(user => {
      return user.email == 'tim@h4i.com'
    })

    await request(app)
      .put(`/workspaces/transfer/${workspaceName}?key=${KEY}`)
      .send({ workspaceId: workspaceName, userEmail: 'tim@h4i.com' })
      .expect(200)

    res = await request(app)
      .get(`/workspaces?key=${KEY}`)
      .expect(200)

    // verify db owner is updated
    res = await request(app).get(`/workspaces/${workspaceName}?key=timko`)
    userRequest = await request(app).get(`/user/?key=${KEY}`)
    expect(res.body.result[0].name).to.eq(workspaceName)
    expect(res.body.result[0].owner).to.eq(newOwnerId[0]._id)
  })
})
