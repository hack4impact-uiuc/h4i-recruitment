const mongoose = require('mongoose')

const Structure = new mongoose.Schema({
  rounds: Number
})
module.exports = mongoose.model('Structure', Structure)
