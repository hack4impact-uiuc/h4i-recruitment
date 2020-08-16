const request = require('supertest')
const { expect, assert } = require('chai')
const app = require('../src/app')
const { KEY, stubAuthUser } = require('./utils')
const { Interview, Candidate } = require('../src/models')
require('./mongo_utils')

var chai = require('chai')
let should = chai.should()

beforeEach(async () => {
  await Candidate.deleteMany()
  await Interview.deleteMany()
})

describe('GET verify_member/:key', () => {
  it('should return false when not stubbed out', async () => {
    const expected = JSON.stringify({
      code: 403,
      message: 'Bad Key',
      success: false
    })
    const res = await request(app).get(`/api/interviews/verify_member`)
    expect(403).to.eq(res.status)
    expect(res.text).to.eq(expected)
  })
  it('should return true when the key matches a key in the db', async () => {
    stubAuthUser({ firstName: 'Test Name', role: 'Pending', email: 'a@b.com' })
    const expected = JSON.stringify({
      code: 200,
      message: 'User is verified',
      success: true,
      result: {
        name: 'Test Name',
        role: 'Pending',
        email: 'a@b.com'
      }
    })
    const res = await request(app).get(`/api/interviews/verify_member?key=${KEY}`)
    expect(200).to.eq(res.status)
    expect(res.text).to.eq(expected)
  })
})

describe('POST /candidates/:candidateId/interviews', () => {
  it('creates one interview', async () => {
    stubAuthUser()
    const candidate = new Candidate({
      name: 'TimInterview1',
      email: 'someemailunique',
      major: 'Computer Engineering',
      resumeID: 'some resume link unique',
      role: []
    })
    await candidate.save()

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
      .post(`/api/candidates/${candidate._id}/interviews?key=${KEY}`)
      .send(interview)
      .expect(200)
  })
})

describe('GET /interviews', () => {
  it('should get all interviews', async () => {
    stubAuthUser()
    const res = await request(app)
      .get(`/api/interviews?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.be.an('array')
  })

  // shouldnt be like this b/c tests should be idempotent
  // it('should get one interview', async () => {
  //   const res = await request(app)
  //     .get(`/api/interview?key=${KEY}`)
  //     .expect(200)
  //   expect(res.body.result.interviews[0].interviewer_key).to.eq('CaptainMeg')
  //   interview_id = res.body.result.interviews[0]._id
  // })
})

describe('PUT /interviews', () => {
  it('should edit an interview', async () => {
    stubAuthUser()
    let interview = new Interview({
      interviewer_key: 'CaptainMeg',
      sections: [],
      candidate_id: '5769',
      overall_score: 3,
      general_notes: 'some notes here'
    })
    await interview.save()

    body_params = {
      general_notes: 'Candidate is amazing'
    }
    const res = await request(app)
      .put(`/api/interviews/${interview._id}?key=${KEY}`)
      .send(body_params)
      .expect(200)

    const changed_interview = await Interview.findById(interview._id)
    expect(changed_interview.general_notes).to.eq('Candidate is amazing')
  })
})

describe('DELETE /interviews', () => {
  it('delete an interview', async () => {
    stubAuthUser()
    let interview = new Interview({
      interviewer_key: 'CaptainMeg',
      sections: [],
      candidate_id: '5555',
      overall_score: 4,
      general_notes: 'some notes here'
    })
    await interview.save()

    await request(app)
      .delete(`/api/interviews/${interview._id}/?key=${KEY}`)
      .expect(200)
    const deleted_candidate = await Interview.findById(interview._id)
  })
})
