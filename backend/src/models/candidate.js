const mongoose = require('mongoose')
const { InterviewSchema } = require('./interview')
const { CommentSchema } = require('./comment')
const { statusEnum, referralEnum } = require('../utils/enums')

const Candidate = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    graduationDate: { type: String },
    gender: { type: String },
    year: { type: String },
    major: { type: String, required: true },
    minor: { type: String },
    resumeID: { type: String, required: true, unique: true },
    github: { type: String },
    githubContributions: { type: String },
    linkedIn: { type: String },
    website: { type: String },
    role: [{ type: String, required: true }],
    roleReason: { type: String },
    joinReason: { type: String },
    timeCommitment: { type: String },
    timeCanDevote: { type: String },
    techExperience: { type: String },
    howTheyKnowUs: { type: String },
    classesTaken: [String],
    classesTaking: [String],
    referrals: [String],
    strongReferrals: [String],
    additionalComments: { type: String },
    interviews: [InterviewSchema], // subdocument
    facemashRankings: {
      elo: { type: Number, default: 1000 },
      numOfMatches: { type: Number, default: 0 }
    },
    status: { type: String, default: statusEnum.PENDING },
    referralStatus: { type: String, default: referralEnum.NO_REFERRAL },
    comments: [CommentSchema], // subdocument
    lastStatusChangeByUser: {
      name: { type: String },
      key: { type: String }
    },
    cycleId: { type: mongoose.Schema.Types.ObjectId }
  },
  { timestamps: true }
)

Candidate.methods.enoughTimeCommitment = candidate => candidate.timeCanDevote >= 8

module.exports = mongoose.model('Candidate', Candidate)
