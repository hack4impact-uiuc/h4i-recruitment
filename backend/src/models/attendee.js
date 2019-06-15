const mongoose = require('mongoose')

const Attendee = new mongoose.Schema({
  name: { type: String, required: true },
  netid: { type: String, required: true },
  year: { type: Number },
  isCandidate: { type: Boolean },
  eventsAttended: { type: [String] }
})

module.exports.AttendeeSchema = Attendee
module.exports.AttendeeModel = mongoose.model('Attendee', Attendee)
