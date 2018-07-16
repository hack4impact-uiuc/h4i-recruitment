const mongoose = require('mongoose')

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  key: String
})
module.exports = mongoose.model('User', User)