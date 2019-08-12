const mongoose = require('mongoose')

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  key: String,
  role: String,
  tokenId: String,
  workspaceId: String
})
module.exports = mongoose.model('User', User)
