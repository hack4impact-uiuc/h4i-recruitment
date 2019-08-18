// MongoDB schema representing a member of Hack4Impact
const mongoose = require('mongoose')

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  key: String,
  role: String,
  workspaceId: String
})
module.exports = mongoose.model('User', User)
