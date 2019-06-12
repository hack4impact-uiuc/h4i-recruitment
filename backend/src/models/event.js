const mongoose = require('mongoose')
const { AttendeeSchema } = require('./attendee')

const Event = new mongoose.Schema(
  {
    name: { type: String },
    date: { type: Date, default: Date.now },
    startTime: { type: Number },
    endTime: { type: Number },
    attendees: { type: [AttendeeSchema] } // subdocument
  }
)

module.exports = mongoose.model('Event', Event)