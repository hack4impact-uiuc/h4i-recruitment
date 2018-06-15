const mongoose = require('mongoose')

const Stats = new mongoose.Schema({
  numOfMatches: { type: Number, default: 0 }
})

module.exports = mongoose.model('Stats', Stats)
