const request = require('supertest')
const { expect, assert } = require('chai')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose-fix').Mockgoose
const app = require('../src/app')
const { KEY } = require('./utils')

const mockgoose = new Mockgoose(mongoose)

var chai = require('chai')
let should = chai.should()

before(done => {
  // Tests might not run on some computers without the following line
  // mockgoose.helper.setDbVersion('3.2.1')
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(
      '',
      function(err) {
        done(err)
      }
    )
  })
})

// This after block is necessary because tests dont terminate when run
// Link to issue: https://github.com/Mockgoose/Mockgoose/issues/71
after(async () => {
  await mockgoose.helper.reset()
  await mongoose.disconnect()
  mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGTERM')
})

describe('GET /interview', () => {
  it('tests get all interviews', async () => {
    const res = await request(app)
      .get(`/interview?key=${KEY}`)
      .expect(200)
  })
})

describe('GET verify_interviewer/:key', () => {
  it('should return false when the key is a substring of the real key', async () => {
    const expected = JSON.stringify({
      code: 403,
      message: 'Bad Key',
      success: false
    })
    const res = await request(app).get(`/interview/verify_interviewer?key=hjsdhfy79`)
    expect(403).to.eq(res.status)
    expect(expected).to.eq(res.text)
  })
  it('should return false when the key contains a substring that is the real key', async () => {
    const expected = JSON.stringify({
      code: 403,
      message: 'Bad Key',
      success: false
    })
    const res = await request(app).get(`/interview/verify_interviewer?key=hjsdhfy79uutt`)
    expect(403).to.eq(res.status)
    expect(expected).to.eq(res.text)
  })
  it('should return true when the key matches a key in the db', async () => {
    const expected = JSON.stringify({ code: 200, message: 'key is verified', success: true })
    const res = await request(app).get(`/interview/verify_interviewer?key=${KEY}`)
    expect(200).to.eq(res.status)
    expect(expected).to.eq(res.text)
  })
  it('should return false when the key is the same length as keys in db but is not in the db', async () => {
    const expected = JSON.stringify({
      code: 403,
      message: 'Bad Key',
      success: false
    })
    const res = await request(app).get(`/interview/verify_interviewer?key=hjsdhfy79ud`)
    expect(403).to.eq(res.status)
    expect(expected).to.eq(res.text)
  })
})

describe('POST /interview', () => {
  it('creates one interview', async () => {
    let interview = {
      interviewer_key: 'CaptainMeg',
      sections: [
        {
          description: 'Time commitment',
          questions: [
            {
              question_text: 'How many commitments does this person have?',
              score: '3'
            },
            {
              question_text: 'Will this person dedicate time to H4i?',
              score: '2'
            }
          ],
          section_notes: 'time commitment is so-so'
        },
        {
          description: 'Abilities',
          questions: [
            {
              question_text: 'Web Dev Experience?',
              score: '2'
            }
          ],
          section_notes: 'experience is limited'
        }
      ],
      candidate_id: '5678',
      overall_score: 3,
      general_notes: 'Candidate is average'
    }
    const res = await request(app)
      .post(`/interview?key=${KEY}`)
      .send(interview)
      .expect(200)
  })
})

let interview_id = 'temp'
describe('GET /interview', () => {
  it('tests get one interview', async () => {
    const res = await request(app)
      .get(`/interview?key=${KEY}`)
      .expect(200)
    expect(res.body.result.interviews[0].interviewer_key).to.eq('CaptainMeg')
    interview_id = res.body.result.interviews[0]._id
  })
})

describe('PUT /interview', () => {
  it('edit an interview', done => {
    body_params = {
      general_notes: 'Candidate is amazing'
    }
    request(app)
      .put(`/interview/${interview_id}?key=${KEY}`)
      .send(body_params)
      .end((err, res) => {
        res.should.have.property('status', 200)
        done()
      })
  })
})

describe('GET /interview', () => {
  it('check interview put request changed it', async () => {
    const res = await request(app)
      .get(`/interview?key=${KEY}`)
      .expect(200)
    expect(res.body.result.interviews[0].general_notes).to.eq('Candidate is amazing')
  })
})

describe('DELETE /interview', () => {
  it('delete an interview', done => {
    request(app)
      .delete(`/interview/${interview_id}/?key=${KEY}`)
      .end((err, res) => {
        res.should.have.property('status', 200)
        done()
      })
  })
})
