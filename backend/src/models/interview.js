const mongoose = require('mongoose')

const Question = new mongoose.Schema({ 
    questionText: {type: String},
    answer: {type: Number}
});
const Section = new mongoose.Schema({ 
    questions: {type: [Question]}, 
    sectionNotes: {type: String}
});
const Interview = new mongoose.Schema({
  interviewerKey: {type: String},
  sections: {type: [Section]},
  overallScore: {type: Number}
});

//module.exports =  Interview;
module.exports = mongoose.model('Interview', Interview)