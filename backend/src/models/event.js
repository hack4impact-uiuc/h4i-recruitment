const mongoose = require('mongoose')
const { AttendeeSchema } = require('./attendee')

const Event = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  attendees: { type: [AttendeeSchema], required: true }, // subdocument
  fbLink: { type: String, required: true }
})

module.exports = mongoose.model('Event', Event)