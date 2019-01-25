// Subdocument to Candidates
const mongoose = require('mongoose')

const Response = new mongoose.Schema({
  text: { type: String },
  score: { type: Number },
  notes: { type: String }
})

const Section = new mongoose.Schema({
  title: { type: String },
  response: { type: Response }
})

const Interview = new mongoose.Schema({
  candidate_id: { type: String },
  candidate_name: { type: String },
  interviewer_key: { type: String },
  interviewer_name: { type: String },
  overall_score: { type: Number },
  general_notes: { type: String },
  sections: { type: [Section] },
  round: { type: String, default: '' },
  scored: { type: Boolean, default: true }
})

module.exports.InterviewSchema = Interview
module.exports.InterviewModel = mongoose.model('Interview', Interview)
