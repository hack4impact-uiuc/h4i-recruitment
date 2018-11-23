// A new document will be created
const mongoose = require('mongoose')

const Question = new mongoose.Schema({
  question_text: { type: String },
  score: { type: Number }
})

const Section = new mongoose.Schema({
  section_name: { type: String },
  description: { type: String },
  questions: { type: [Question] },
  section_notes: { type: String }
})

const Interview = new mongoose.Schema({
  candidate_id: { type: String },
  candidate_name: { type: String },
  interviewer_key: { type: String },
  interviewer_name: { type: String },
  overall_score: { type: Number },
  general_notes: { type: String },
  category_notes: { type: String },
  category: { type: String },
  sections: { type: [Section] }
})

module.exports.InterviewSchema = Interview
module.exports.InterviewModel = mongoose.model('Interview', Interview)
