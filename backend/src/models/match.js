const mongoose = require('mongoose')

const Matches = new mongoose.Schema({
  candidate1: { type: mongoose.Schema.Types.ObjectId, required: true },
  candidate2: { type: mongoose.Schema.Types.ObjectId, require: true },
  winnerID: { type: mongoose.Schema.Types.ObjectId, default: '' },
  submittedBy: { type: String, default: '' },
  submittedAt: { type: Date }
})

module.exports = mongoose.model('Matches', Matches)
