// Subdocument to Candidates
const mongoose = require('mongoose')

const Question = new mongoose.Schema({
  question_text: { type: String },
  score: { type: Number, default: 0 }, // 0 indicates that a question is not scored, e.g. a category/feedback only question
  notes_prompt: { type: String, default: '' }, // if there is space for additional notes, this contains the header
  type: { type: String, enum: ['Dropdown', 'Multiple Choice', 'None'] }, // Pick one for a notes-only question
  options: { type: [String] }, // strings containing JSON objects with keys for score (optional) and description (optional) with at least one required
  answer: { type: String },
  notes_answer: { type: String, default: '' }
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
  sections: { type: [Section] },
  structure: { type: String } // a string containing the JSON configuration of the round this interview belongs to for reconstruction
})

module.exports.InterviewSchema = Interview
module.exports.InterviewModel = mongoose.model('Interview', Interview)
