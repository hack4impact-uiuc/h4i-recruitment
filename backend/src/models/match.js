const mongoose = require('mongoose')

const Matches = new mongoose.Schema({
  candidate1: { type: mongoose.Schema.Types.ObjectId, required: true },
  candidate2: { type: mongoose.Schema.Types.ObjectId, required: true },
  winnerID: { type: mongoose.Schema.Types.ObjectId, default: null },
  submittedBy: { type: String, default: '' },
  submittedByKey: { type: String, default: '' },
  submittedAt: { type: Date }
})

module.exports = mongoose.model('Matches', Matches)
