const mongoose = require('mongoose')

const Matches = new mongoose.Schema({
  candidate1: { type: String, required: true },
  candidate2: { type: String, require: true },
  winnerID: { type: String, default: '' },
  submittedBy: { type: String, default: '' },
  submittedAt: { type: Date }
})

module.exports = mongoose.model('Matches', Matches)
