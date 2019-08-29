const mongoose = require('mongoose')

const InterviewAvailability = new mongoose.Schema({
  type: { type: String, enum: ['CANDIDATES', 'INTERVIEWERS'] },
  availabilities: { type: [mongoose.Schema.Types.Mixed], required: true },
  timeSlots: { type: [mongoose.Schema.Types.Date], required: true },
  interviewDuration: { type: Number, required: true }
})

module.exports = mongoose.model('InterviewAvailability', InterviewAvailability)
