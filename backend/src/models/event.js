const mongoose = require('mongoose')

const Event = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  attendeeEmails: { type: [String], default: [] },
  lateAttendeeEmails: { type: [String], default: [] },
  fbLink: { type: String, required: true },
  cycleId: { type: mongoose.Schema.Types.ObjectId }
})

module.exports = mongoose.model('Event', Event)
