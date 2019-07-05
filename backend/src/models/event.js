const mongoose = require('mongoose')
const { AttendeeSchema } = require('./attendee')

const Event = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  attendees: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  lateAttendees: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  fbLink: { type: String, required: true },
  workspaceId: { type: String }
})

module.exports = mongoose.model('Event', Event)
