const mongoose = require('mongoose')

const Attendee = new mongoose.Schema({
  name: { type: String, required: true },
  netId: { type: String, required: true },
  email: { type: String, required: true },
  year: { type: Number, required: true },
  lateEvents: { type: [mongoose.Schema.Types.ObjectId], required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, required: true },
  eventsAttended: { type: [String], required: true },
  workspaceId: { type: String }
})

module.exports.AttendeeSchema = Attendee
module.exports.AttendeeModel = mongoose.model('Attendee', Attendee)
