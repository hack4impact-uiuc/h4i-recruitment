const mongoose = require('mongoose')

const Candidate = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  graduationDate: { type: String },
  major: { type: String, require: true },
  minor: { type: String },
  resumeID: { type: String, require: true, unique: true },
  github: { type: String },
  linkedIn: { type: String },
  website: { type: String },
  role: { type: String, require: true },
  roleReason: { type: String },
  joinReason: { type: String },
  timeCommitment: { type: String },
  timeCanDevote: { type: Number },
  techExperience: { type: String },
  howTheyKnowUs: { type: String },
  additionalComments: { type: String }
})

Candidate.methods.enoughTimeCommitment = (candidate) => candidate.timeCanDevote >= 8

module.exports = mongoose.model('Candidate', Candidate)
