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

//module.exports =  Interview;
module.exports = mongoose.model('Interview', Interview)
