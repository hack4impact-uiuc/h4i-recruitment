const request = require('supertest')
const app = require('../src/app')
const sinon = require('sinon');
const { Candidate, Match } = require('../src/models')
const { expect, assert} = require('chai')

describe ('GET /matchCandidates', () => {
  
  it ('should return json with 2 candidates and matchID', async () => {
    const match_with_id = Match({
      candidate1: '1234',
      candidate2: '5678',
    })
    sinon.stub(Match, 'constructor').returns(match_with_id)
    sinon.stub(Candidate, 'aggregate').returns([{name: 'candidate1', _id: 'id1'}, {name: 'candidate2', _id: 'id2'}])
    const matchSaveStub = sinon.stub(Match.prototype, 'save').resolves('True')
    // not sure why you have to put the request inside 
    // js is weird...
    const res = await request(app).get('/matchCandidates')
    expect(res).to.be.an('object')
    const { result, _ } = res.body
    expect(result).to.own.property('matchID')
    expect(result).to.own.property('candidate1')
    expect(result).to.have.deep.property('candidate2',{name: 'candidate2',"_id": "id2"})
    expect(result).to.have.deep.property('candidate1', {name: 'candidate1',"_id": "id1"})
    matchSaveStub.restore()
  })
})
// TODO: test utility functions