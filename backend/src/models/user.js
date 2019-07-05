const mongoose = require('mongoose')

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  key: String,
  workspaceId: String
})
module.exports = mongoose.model('User', User)
