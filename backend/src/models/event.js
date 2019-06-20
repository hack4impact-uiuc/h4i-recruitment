const mongoose = require('mongoose')
const { AttendeeSchema } = require('./attendee')

const Event = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  attendees: { type: [AttendeeSchema], required: true } // subdocument
})

module.exports = mongoose.model('Event', Event)
