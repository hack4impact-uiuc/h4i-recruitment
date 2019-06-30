const request = require('supertest')
const sinon = require('sinon')
const {
  expect
} = require('chai')
const app = require('../src/app')
const {
  Event
} = require('../src/models')
const {
  KEY,
  NONLEAD_KEY
} = require('./utils')
const {
  statusEnums
} = require('../src/utils/enums')

describe('App can run', done => {
  it('returns status 200', async () => {
    const res = await request(app)
      .get(`/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /events', done => {
  afterEach(() => {
    Event.find.restore()
  })
  it('should return array of Objects', async () => {
    // stub the find() function of Candidates and make it return a Promise that resolves to the array specified inside
    sinon.stub(Event, 'find').resolves([{
        name: 'Alices Event',
        attendees: [],
      },
      {
        name: 'Annies Event',
        attendees: [],
      },
    ])

    const res = await request(app)
      .get(`/events?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.have.lengthOf(2)
    expect(res.body.result[0].name).equal('Alices Event')
    expect(res.body.result[0].attendees).to.be.an('array').that.is.empty;
    expect(res.body.result[1].name).equal('Annies Event')
  })

  it('should return an empty array when mongo returns empty', async () => {
    sinon.stub(Event, 'find').resolves([])

    const res = await request(app)
      .get(`/events?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.have.lengthOf(0)
  })
})

describe('GET /events/:eventId', async () => {
  // setup
  const expected = Event({
    name: 'Alices Event',
    _id: '5abf3dcf1d567955609d2bd4',
  })

  it('should call findById with the correct parameters', async () => {
    const eventFindStub = sinon.stub(Event, 'findById').resolves(expected)
    const res = await request(app).get(`/events/5abf3dcf1d567955609d2bd4?key=${KEY}`)
    expect(eventFindStub.getCall(0).args)
      .to.be.an('array')
      .that.does.include('5abf3dcf1d567955609d2bd4')
    eventFindStub.restore()
  })

  it('should return an Event', async () => {
    const eventFindStub = sinon.stub(Event, 'findById').resolves(expected)
    const res = await request(app)
      .get(`/events/5abf3dcf1d567955609d2bd4?key=${KEY}`)
      .expect(200)
    expect(res.body).to.be.an('object')
    eventFindStub.restore()
  })

  describe('POST /events', async () => {
    it('should call Event.save() once', async () => {
      // should resolve nothing
      // Needs to stub Candidate.prototype's save, not Candidate's save
      // because `save` belongs to the instance of a Candidate
      const eventSaveStub = sinon.stub(Event.prototype, 'save').resolves('True')
      const res = await request(app).post(`/events?key=${KEY}`)
      expect(res.body.code).equal(200)
      expect(eventSaveStub.calledOnce).equal(true)

      // reset stub
      eventSaveStub.restore()
    })
  })

  // describe('PUT /events/:eventId', async () => {
  //   it('should call findByIdAndUpdate once', async () => {
  //     const eventSaveStub = sinon.stub(Event.prototype, 'save').resolves('True')
  //     const res = await request(app).put(`/events/:eventId?key=${KEY}`)
  //     expect(candidateSaveStub.calledOnce).equal(true)

  //     // reset stub
  //     candidateSaveStub.restore()
  //   })
  // })


})