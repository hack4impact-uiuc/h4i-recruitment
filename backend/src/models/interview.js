const mongoose = require('mongoose')

const Question = new mongoose.Schema({ 
    questionText: String,
    answer: Number
});
const Section = new mongoose.Schema({ 
    questions: [Question],
    sectionNotes: String
});
const Interview = new mongoose.Schema({
  interviewerKey: String,
  sections: [Section],
  overallScore: Number
})

module.exports =  Interview;
