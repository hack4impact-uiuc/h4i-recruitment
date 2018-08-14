const mongoose = require('mongoose')

const Question = new mongoose.Schema({
  question_text: { type: String },
  score: { type: Number }
})
const Section = new mongoose.Schema({
  description: { type: String },
  questions: { type: [Question] },
  section_notes: { type: String }
})
const Interview = new mongoose.Schema({
  interviewer_key: { type: String },
  overall_score: { type: Number },
  general_notes: { type: String },
  sections: { type: [Section] }
})

let interview_model = mongoose.model('Interview', Interview)
let section_model = mongoose.model('Section', Section)
let question_model = mongoose.model('Question', Question)

module.exports = interview_model, section_model, question_model

