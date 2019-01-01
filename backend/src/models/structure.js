const mongoose = require('mongoose')

const Structure = new mongoose.Schema({
  round: Number
})
module.exports = mongoose.model('Structure', Structure)
