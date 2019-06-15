const mongoose = require('mongoose')
const { AttendeeSchema } = require('./attendee')

const Event = new mongoose.Schema(
  {
    name: { type: String },
    date: { type: String },
    startTime: { type: Number },
    endTime: { type: Number },
    location: { type: String },
    description: { type: String },
    attendees: { type: [AttendeeSchema] } // subdocument
  }
)

module.exports = mongoose.model('Event', Event)