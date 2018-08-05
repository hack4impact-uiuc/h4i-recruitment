const request = require('supertest')
const app = require('../src/app')
const sinon = require('sinon');
const { Candidate, Match } = require('../src/models')
const { expect, assert} = require('chai')
const Mockgoose = require('mockgoose-fix').Mockgoose
const mongoose = require('mongoose')
const mockgoose = new Mockgoose(mongoose)

before(done => {
  // Tests might not run on some computers without this line
  mockgoose.helper.setDbVersion('3.2.1')
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://example.com/TestingDB', function(err) {
        done(err)
    })
  })
})

// This after block is necessary because tests dont terminate when run
// Link to issue: https://github.com/Mockgoose/Mockgoose/issues/71
after(async () => {
  await mockgoose.helper.reset();
  await mongoose.disconnect();
  mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGTERM');
})


describe ('GET /matchCandidates', () => {
  beforeEach(() => {
    mockgoose.helper.reset()
  })

  it ('should return json with 2 candidates and matchID when exactly 2 candidates have min', async () => {
    await Candidate.insertMany([
      { _id: '5abf3dcf1d567955609d2bd1', name: '', email: 'a', major: '', role: '', resumeID: 'a', facemashRankings:{
        numOfMatches: 5
      }},
      { _id: '5abf3dcf1d567955609d2bd2', name: '', email: 'b', major: '', role: '', resumeID: 'b', facemashRankings:{
        numOfMatches: 5
      }},
      { _id: '5abf3dcf1d567955609d2bd3', name: '', email: 'c', major: '', role: '', resumeID: 'c', facemashRankings:{
        numOfMatches: 6
      }},
      { _id: '5abf3dcf1d567955609d2bd4', name: '', email: 'd', major: '', role: '', resumeID: 'd', facemashRankings:{
        numOfMatches: 6
      }},
      { _id: '5abf3dcf1d567955609d2bd5', name: '', email: 'e', major: '', role: '', resumeID: 'e', facemashRankings:{
        numOfMatches: 6
      }}
    ])
    const res = await request(app).get('/matchCandidates').expect(200)
    const matched_candidates = ['5abf3dcf1d567955609d2bd1','5abf3dcf1d567955609d2bd2']
    expect(matched_candidates).to.contain.members([res.body.result.candidate1._id])
    expect(matched_candidates).to.contain.members([res.body.result.candidate2._id])
    expect(res.body.result.candidate1._id).to.not.equal(res.body.result.candidate2._id)
    const match = await Match.find({ _id: res.body.result.matchID })
    expect(match).to.have.lengthOf(1)
  })

  it ('should return json with 2 candidates and matchID when 1 candidate has min', async () => {
    await Candidate.insertMany([
      { _id: '5abf3dcf1d567955609d2bd1', name: '', email: 'a', major: '', role: '', resumeID: 'a', facemashRankings:{
        numOfMatches: 5
      }},
      { _id: '5abf3dcf1d567955609d2bd2', name: '', email: 'b', major: '', role: '', resumeID: 'b', facemashRankings:{
        numOfMatches: 6
      }},
      { _id: '5abf3dcf1d567955609d2bd3', name: '', email: 'c', major: '', role: '', resumeID: 'c', facemashRankings:{
        numOfMatches: 7
      }},
      { _id: '5abf3dcf1d567955609d2bd4', name: '', email: 'd', major: '', role: '', resumeID: 'd', facemashRankings:{
        numOfMatches: 7
      }},
      { _id: '5abf3dcf1d567955609d2bd5', name: '', email: 'e', major: '', role: '', resumeID: 'e', facemashRankings:{
        numOfMatches: 7
      }}
    ])
    const res = await request(app).get('/matchCandidates').expect(200)
    expect(res.body.result.candidate1._id).to.eq('5abf3dcf1d567955609d2bd1')
    expect(res.body.result.candidate2._id).to.eq('5abf3dcf1d567955609d2bd2')
    const match = await Match.find({ _id: res.body.result.matchID })
    expect(match).to.have.lengthOf(1)
  })

  it ('should not pick an existing match', async () => {
    await Candidate.insertMany([
      { _id: '5abf3dcf1d567955609d2bd1', name: '', email: 'a', major: '', role: '', resumeID: 'a', facemashRankings:{
        numOfMatches: 5
      }},
      { _id: '5abf3dcf1d567955609d2bd2', name: '', email: 'b', major: '', role: '', resumeID: 'b', facemashRankings:{
        numOfMatches: 5
      }},
      { _id: '5abf3dcf1d567955609d2bd3', name: '', email: 'c', major: '', role: '', resumeID: 'c', facemashRankings:{
        numOfMatches: 6
      }},
      { _id: '5abf3dcf1d567955609d2bd4', name: '', email: 'd', major: '', role: '', resumeID: 'd', facemashRankings:{
        numOfMatches: 7
      }},
      { _id: '5abf3dcf1d567955609d2bd5', name: '', email: 'e', major: '', role: '', resumeID: 'e', facemashRankings:{
        numOfMatches: 7
      }}
    ])
    const prev_match = new Match({
      candidate1: '5abf3dcf1d567955609d2bd1',
      candidate2: '5abf3dcf1d567955609d2bd2'
    })
    await prev_match.save()
    const res = await request(app).get('/matchCandidates').expect(200)
    const matched_candidates = ['5abf3dcf1d567955609d2bd1','5abf3dcf1d567955609d2bd2']
    expect(matched_candidates).to.contain.members([res.body.result.candidate1._id])
    expect(res.body.result.candidate2._id).to.eq('5abf3dcf1d567955609d2bd3')
    const match = await Match.find({ _id: res.body.result.matchID })
    expect(match).to.have.lengthOf(1)
  })
})

describe ('POST /matchCandidates', () => {
  beforeEach(() => {
    mockgoose.helper.reset()
  })

  it ('should raise candidate1 elo and lower candidate2 elo', async () => {
    await Candidate.insertMany([
      { _id: '5abf3dcf1d567955609d2bd1', name: '', email: 'a', major: '', role: '',
        resumeID: 'a', facemashRankings:{ elo: 1200 }
      },
      { _id: '5abf3dcf1d567955609d2bd2', name: '', email: 'b', major: '', role: '',
        resumeID: 'b', facemashRankings:{ elo: 1000 }
      }
    ])
    await Match.insertMany([
      {
        _id: '5abf3dcf1d567955609d2bd3',
        candidate1: '5abf3dcf1d567955609d2bd1',
        candidate2: '5abf3dcf1d567955609d2bd2'
      }
    ])
    const frontend_payload = { candidate1: '5abf3dcf1d567955609d2bd1',
                               candidate2: '5abf3dcf1d567955609d2bd2',
                               winnerID: '5abf3dcf1d567955609d2bd1',
                               matchID: '5abf3dcf1d567955609d2bd3'}
    await request(app).post('/matchCandidates').send(frontend_payload).expect(200)
    const cand1 = await Candidate.findById('5abf3dcf1d567955609d2bd1')
    const cand2 = await Candidate.findById('5abf3dcf1d567955609d2bd2')
    expect(cand1.facemashRankings.elo).to.eq(1207.2)
    expect(cand2.facemashRankings.elo).to.eq(992.8)
  })

  it ('should raise candidate2 elo and lower candidate1 elo', async () => {
    await Candidate.insertMany([
      { _id: '5abf3dcf1d567955609d2bd1', name: '', email: 'a', major: '', role: '',
        resumeID: 'a', facemashRankings:{ elo: 1200 }
      },
      { _id: '5abf3dcf1d567955609d2bd2', name: '', email: 'b', major: '', role: '',
        resumeID: 'b', facemashRankings:{ elo: 1000 }
      }
    ])
    const prev_match = new Match({
      _id: '5abf3dcf1d567955609d2bd3',
      candidate1: '5abf3dcf1d567955609d2bd1',
      candidate2: '5abf3dcf1d567955609d2bd2'
    })
    await prev_match.save()
    const frontend_payload = { candidate1: '5abf3dcf1d567955609d2bd1',
                               candidate2: '5abf3dcf1d567955609d2bd2',
                               winnerID: '5abf3dcf1d567955609d2bd2',
                               matchID: '5abf3dcf1d567955609d2bd3'}
    await request(app).post('/matchCandidates').send(frontend_payload).expect(200)
    const cand1 = await Candidate.findById('5abf3dcf1d567955609d2bd1')
    const cand2 = await Candidate.findById('5abf3dcf1d567955609d2bd2')
    expect(cand2.facemashRankings.elo).to.eq(1022.8)
    expect(cand1.facemashRankings.elo).to.eq(1177.2)
  })
})
// TODO: test utility functions
