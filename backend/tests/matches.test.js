const request = require('supertest')
const { expect } = require('chai')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose-fix').Mockgoose
const app = require('../src/app')
const { Candidate, Match } = require('../src/models')
const { candidateIds, createCandidates, createMatches, matchIds, KEY } = require('./utils.js')
const mockgoose = new Mockgoose(mongoose)
const { statusEnum } = require('../src/utils/enums')

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

describe('GET /matchCandidates', () => {
  beforeEach(() => {
    mockgoose.helper.reset()
  })

  it('should return json with 2 candidates and matchID when exactly 2 candidates have min', async () => {
    await createCandidates([5, 5, 6, 6, 6], [0, 0, 0, 0, 0])
    const res = await request(app)
      .get(`/matchCandidates?key=${KEY}`)
      .expect(200)
    const matched_candidates = [candidateIds(0), candidateIds(1)]
    expect(matched_candidates).to.contain.members([res.body.result.candidate1._id])
    expect(matched_candidates).to.contain.members([res.body.result.candidate2._id])
    expect(res.body.result.candidate1._id).to.not.equal(res.body.result.candidate2._id)
    const match = await Match.find({ _id: res.body.result.matchID })
    expect(match).to.have.lengthOf(1)
  })

  it('should return json with 2 candidates and matchID when 1 candidate has min', async () => {
    await createCandidates([5, 6, 7, 7, 7], [0, 0, 0, 0, 0])
    const res = await request(app)
      .get(`/matchCandidates?key=${KEY}`)
      .expect(200)
    expect(res.body.result.candidate1._id).to.eq(candidateIds(0))
    expect(res.body.result.candidate2._id).to.eq(candidateIds(1))
    const match = await Match.find({ _id: res.body.result.matchID })
    expect(match).to.have.lengthOf(1)
  })

  it('should not pick an existing match', async () => {
    await createCandidates([5, 5, 6, 7, 7], [0, 0, 0, 0, 0])
    await createMatches([[0, 1]])
    const res = await request(app)
      .get(`/matchCandidates?key=${KEY}`)
      .expect(200)
    const matched_candidates = [candidateIds(0), candidateIds(1)]
    expect(matched_candidates).to.contain.members([res.body.result.candidate1._id])
    expect(res.body.result.candidate2._id).to.eq(candidateIds(2))
    const match = await Match.find({ _id: res.body.result.matchID })
    expect(match).to.have.lengthOf(1)
  })

  // it('should not pick a rejected candidate for a match', async () => {
  //   await createCandidates([5, 5, 6, 7, 7], [0, 0, 0, 0, 0])
  //   let cand1 = await Candidate.findById(candidateIds(0))
  //   cand1.status = statusEnum.REJECTED
  //   await cand1.save()
  //   console.log(await Candidate.find())
  //   const res = await request(app)
  //     .get(`/matchCandidates?key=${KEY}`)
  //     .expect(200)
  //   expect(res.body.result.candidate1._id).to.eq(candidateIds(3))
  //   expect(res.body.result.candidate2._id).to.eq(candidateIds(2))
  //   const match = await Match.find({ _id: res.body.result.matchID })
  //   expect(match).to.have.lengthOf(1)
  // })
})

describe('POST /matchCandidates', () => {
  beforeEach(() => {
    mockgoose.helper.reset()
  })

  it('should raise candidate1 elo and lower candidate2 elo', async () => {
    await createCandidates([1, 1], [1200, 1000])
    await createMatches([[0, 1]])
    const frontend_payload = {
      candidate1: candidateIds(0),
      candidate2: candidateIds(1),
      winnerID: candidateIds(0),
      matchID: matchIds(0)
    }
    await request(app)
      .post(`/matchCandidates?key=${KEY}`)
      .send(frontend_payload)
      .expect(200)
    const cand1 = await Candidate.findById(candidateIds(0))
    const cand2 = await Candidate.findById(candidateIds(1))
    expect(cand1.facemashRankings.elo).to.eq(1207.2)
    expect(cand2.facemashRankings.elo).to.eq(992.8)
  })

  it('should raise candidate2 elo and lower candidate1 elo', async () => {
    await createCandidates([1, 1], [1200, 1000])
    await createMatches([[0, 1]])
    const frontend_payload = {
      candidate1: candidateIds(0),
      candidate2: candidateIds(1),
      winnerID: candidateIds(1),
      matchID: matchIds(0)
    }
    await request(app)
      .post(`/matchCandidates?key=${KEY}`)
      .send(frontend_payload)
      .expect(200)
    const cand1 = await Candidate.findById(candidateIds(0))
    const cand2 = await Candidate.findById(candidateIds(1))
    expect(cand2.facemashRankings.elo).to.eq(1022.8)
    expect(cand1.facemashRankings.elo).to.eq(1177.2)
  })

  it('should save person who saved the match', async () => {
    await createCandidates([1, 1], [1200, 1000])
    await createMatches([[0, 1]])
    const frontend_payload = {
      candidate1: candidateIds(0),
      candidate2: candidateIds(1),
      winnerID: candidateIds(1),
      matchID: matchIds(0)
    }
    await request(app)
      .post(`/matchCandidates?key=${KEY}`)
      .send(frontend_payload)
      .expect(200)
    const match = await Match.findById(matchIds(0))
    expect(match.submittedBy).to.eq('Test Key')
    expect(match.submittedByKey).to.eq(KEY)
  })
})
// TODO: test utility functions
