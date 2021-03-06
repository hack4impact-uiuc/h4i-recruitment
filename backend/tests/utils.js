const sinon = require('sinon')
const auth = require('../src/middleware/auth')
const { Candidate, Match, User } = require('../src/models')
const { populateAuthFieldsForReq } = require('../src/middleware/auth')

const KEY = 'director'
const NONLEAD_KEY = 'member'
// Build unique mongo ObjectId for candidate given index of candidate
// The slice statement makes sure that the ObjectId is valid even if num is
// greater than 10 (takes up more than 1 character)
const candidateIds = num => {
  return ('00000000000000000000000' + (num + 1)).slice(-24)
}

// Build unique mongo ObjectId for match given index of match
const matchIds = num => {
  return (num + 1 + '00000000000000000000000').slice(0, 24)
}

const stubAuthUser = usr => {
  const currentUser = new User({ role: 'Director', ...usr })
  const myStub = sinon.stub(auth, 'validateRequest')
  myStub.callsFake((req, res, next) => {
    req.user = currentUser
    populateAuthFieldsForReq(req)
    next()
  })
  return currentUser
}

// Creates n candidates given 2 arrays of length n which contain the number of
// matches each candidate has been in and their current elo, respectively
const createCandidates = async (numOfMatches, elos) => {
  let query = []
  for (let i = 0; i < numOfMatches.length; i++) {
    query.push({
      _id: candidateIds(i),
      name: 'Candidate ' + i,
      email: 'Email ' + i,
      major: 'Major ' + i,
      role: [],
      resumeID: 'Resume ' + i,
      facemashRankings: {
        numOfMatches: numOfMatches[i],
        elo: elos[i]
      }
    })
  }
  await Candidate.insertMany(query)
}

// Creates n matches given an array of size n where each entry is an array
// of size 2 that contains the index of each candidate (only works after
// createCandidates is called)
const createMatches = async matches => {
  let query = []
  for (let i = 0; i < matches.length; i++) {
    query.push({
      _id: matchIds(i),
      candidate1: candidateIds(matches[i][0]),
      candidate2: candidateIds(matches[i][1])
    })
  }
  await Match.insertMany(query)
}

module.exports = {
  candidateIds,
  createCandidates,
  createMatches,
  matchIds,
  KEY,
  NONLEAD_KEY,
  stubAuthUser
}
