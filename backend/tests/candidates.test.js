const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')
const app = require('../src/app')
const { Candidate } = require('../src/models')
const { stubAuthUser } = require('./utils')
require('./mongo_utils')

afterEach(() => {
  sinon.restore()
})
// for expects/assertions, look at chai
// for different ways to stub/mock/spy on functions, look into sinon
describe('App can run', done => {
  it('returns status 200', async () => {
    stubAuthUser()
    await request(app)
      .get(`/api/`)
      .expect(200)
  })
})

describe('GET /candidates', done => {
  afterEach(() => {
    Candidate.find.restore()
  })
  it('should return array of Objects', async () => {
    stubAuthUser()
    // stub the find() function of Candidates and make it return a Promise that resolves to the array specified inside
    sinon.stub(Candidate, 'find').resolves([
      {
        name: 'Tim'
      },
      {
        name: 'Tim2'
      }
    ])

    const res = await request(app)
      .get(`/api/candidates`)
      .expect(200)
    expect(res.body.result).to.have.lengthOf(2)
    expect(res.body.result[0].name).equal('Tim')
  })

  it('should return an empty array when mongo returns empty', async () => {
    stubAuthUser()
    sinon.stub(Candidate, 'find').resolves([])

    const res = await request(app)
      .get(`/api/candidates`)
      .expect(200)
    expect(res.body.result).to.have.lengthOf(0)
  })

  it('should call Candidate.find() with status parameters when `status` args is passed in', async () => {
    stubAuthUser()
    const candidateFindStub = sinon.stub(Candidate, 'find').resolves([
      {
        name: 'Tim',
        status: 'pending'
      }
    ])

    await request(app)
      .get(`/api/candidates?status=pending`)
      .expect(200)
    // checks whether Candidate.find() was called with arguments {status: 'pending}
    expect(candidateFindStub.getCall(0).args).to.deep.include({
      status: 'pending'
    })
  })
  // TODO: Test whether it returns status 500 if error
})

describe('GET /candidates/:candidateId', async () => {
  // setup
  const expected = Candidate({
    name: 'Tim',
    status: 'pending',
    _id: '5abf3dcf1d567955609d2bd4'
  })

  it('should call findById with the correct Parameters', async () => {
    stubAuthUser()
    const candidateFindStub = sinon.stub(Candidate, 'findById').resolves(expected)
    await request(app).get(`/api/candidates/5abf3dcf1d567955609d2bd4`)
    expect(candidateFindStub.getCall(0).args)
      .to.be.an('array')
      .that.does.include('5abf3dcf1d567955609d2bd4')
    candidateFindStub.restore()
  })

  it('should return a Candidate', async () => {
    stubAuthUser()
    const candidateFindStub = sinon.stub(Candidate, 'findById').resolves(expected)
    const res = await request(app)
      .get(`/api/candidates/5abf3dcf1d567955609d2bd4`)
      .expect(200)
    expect(res.body).to.be.an('object')
    candidateFindStub.restore()
  })
})

describe('POST /candidates/:id/comments', async () => {
  let candidate

  beforeEach(async () => {
    candidate = new Candidate({
      name: 'Tim',
      resumeID: 'a',
      email: 'a',
      major: 'a',
      role: []
    })
    await candidate.save()
  })

  it('should add a comment', async () => {
    stubAuthUser()
    await request(app)
      .post(`/api/candidates/${candidate._id}/comments`)
      .send({
        comment: 'test comment'
      })
      .expect(200)
  })

  it('should return 400 if comment was not provided', async () => {
    stubAuthUser()
    await request(app)
      .post(`/api/candidates/${candidate._id}/comments`)
      .expect(400)
  })
})

describe('POST /candidates/:id/status', async () => {
  let candidateStatus

  beforeEach(async () => {
    candidateStatus = new Candidate({
      name: 'TimChangeStatus',
      email: 'someemail',
      resumeID: 'some resume link',
      major: 'ce'
    })
    await candidateStatus.save()
  })

  it('should change the status', async () => {
    stubAuthUser()
    await request(app)
      .post(`/api/candidates/${candidateStatus._id}/status`)
      .send({
        status: 'Accepted'
      })
      .expect(200)
  })

  it('should return 403 if key does not end in lead suffix', async () => {
    stubAuthUser({ role: 'Pending' })
    await request(app)
      .post(`/api/candidates/${candidateStatus._id}/status`)
      .send({
        status: 'Accepted'
      })
      .expect(403)
  })

  it('should return 400 if status is not an accepted Status', async () => {
    stubAuthUser()
    await request(app)
      .post(`/api/candidates/${candidateStatus._id}/status`)
      .send({
        status: 'Weird Status'
      })
      .expect(400)
  })
})
