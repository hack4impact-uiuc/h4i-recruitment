const request = require('supertest')
const app = require('../src/app')
const sinon = require('sinon')
const { Candidate } = require('../src/models')
const { expect } = require('chai')
const { KEY } = require('./utils')

// for expects/assertions, look at chai
// for different ways to stub/mock/spy on functions, look into sinon
describe('App can run', done => {
  it('returns status 200', async () => {
    const res = await request(app)
      .get(`/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /candidates', done => {
  afterEach(() => {
    Candidate.find.restore()
  })
  it('should return array of Objects', async () => {
    // stub the find() function of Candidates and make it return a Promise that resolves to the array specified inside
    sinon.stub(Candidate, 'find').resolves([{ name: 'Tim' }, { name: 'Tim2' }])

    const res = await request(app)
      .get(`/candidates?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.have.lengthOf(2)
    expect(res.body.result[0].name).equal('Tim')
  })

  it('should return an empty array when mongo returns empty', async () => {
    sinon.stub(Candidate, 'find').resolves([])

    const res = await request(app)
      .get(`/candidates?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.have.lengthOf(0)
  })

  it('should call Candidate.find() with status parameters when `status` args is passed in', async () => {
    const candidateFindStub = sinon
      .stub(Candidate, 'find')
      .resolves([{ name: 'Tim', status: 'pending' }])

    const res = await request(app)
      .get(`/candidates?status=pending&&key=${KEY}`)
      .expect(200)
    // checks whether Candidate.find() was called with arguments {status: 'pending}
    expect(candidateFindStub.getCall(0).args).to.deep.include({ status: 'pending' })
  })
  // TODO: Test whether it returns status 500 if error
})

describe('GET /candidates/:candidateId', async () => {
  // setup
  const expected = Candidate({ name: 'Tim', status: 'pending', _id: '5abf3dcf1d567955609d2bd4' })

  it('should call findById with the correct Parameters', async () => {
    const candidateFindStub = sinon.stub(Candidate, 'findById').resolves(expected)
    const res = await request(app).get(`/candidates/5abf3dcf1d567955609d2bd4?key=${KEY}`)
    expect(candidateFindStub.getCall(0).args)
      .to.be.an('array')
      .that.does.include('5abf3dcf1d567955609d2bd4')
    candidateFindStub.restore()
  })

  it('should return a Candidate', async () => {
    const candidateFindStub = sinon.stub(Candidate, 'findById').resolves(expected)
    const res = await request(app)
      .get(`/candidates/5abf3dcf1d567955609d2bd4?key=${KEY}`)
      .expect(200)
    expect(res.body).to.be.an('object')
    candidateFindStub.restore()
  })
})

describe('POST /candidates', async () => {
  // TODO: Fix this when POST /candidates is working properly
  it('should call Candidate.save() once', async () => {
    // should resolve nothing
    // Needs to stub Candidate.prototype's save, not Candidate's save
    // because `save` belongs to the instance of a Candidate
    const candidateSaveStub = sinon.stub(Candidate.prototype, 'save').resolves('True')
    const res = await request(app).post(`/candidates?key=${KEY}`)
    expect(candidateSaveStub.calledOnce).equal(true)

    // reset stub
    candidateSaveStub.restore()
  })
})

describe('POST /candidates/:id/comments', async () => {
  const candidate = new Candidate({ name: 'Tim' })
  await candidate.save()
  it('should add a comment', async () => {
    const res = await request(app)
      .post(`/candidates/${candidate._id}/comments?key=${KEY}`)
      .send({ comment: 'test comment' })
      .expect(200)
  })

  it('should return 400 if comment was not provided', async () => {
    await request(app)
      .post(`/candidates/${candidate._id}/comments?key=${KEY}`)
      .expect(400)
  })
})
