const mongoose = require('mongoose')

const Attendee = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  year: { type: String, required: true },
  attendedEvents: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  lateEvents: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  workspaceId: { type: String }
})

module.exports = mongoose.model('Attendee', Attendee)
