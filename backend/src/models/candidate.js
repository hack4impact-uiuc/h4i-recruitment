const mongoose = require('mongoose')
const Interview = require('./interview')
const { statusEnum } = require('../utils/enums')

const Candidate = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  graduationDate: { type: String },
  year: { type: String },
  major: { type: String, require: true },
  minor: { type: String },
  resumeID: { type: String, require: true, unique: true },
  github: { type: String },
  githubContributions: { type: String },
  linkedIn: { type: String },
  website: { type: String },
  role: [{ type: String, require: true }],
  roleReason: { type: String },
  joinReason: { type: String },
  timeCommitment: { type: String },
  timeCanDevote: { type: String },
  techExperience: { type: String },
  howTheyKnowUs: { type: String },
  additionalComments: { type: String },
  //interviews: [Interview],
  facemashRankings: {
    elo: { type: Number, default: 1000 },
    numOfMatches: { type: Number, default: 0 }
  },
  status: { type: String, default: statusEnum.PENDING }
})

Candidate.methods.enoughTimeCommitment = candidate => candidate.timeCanDevote >= 8

module.exports = mongoose.model('Candidate', Candidate)
