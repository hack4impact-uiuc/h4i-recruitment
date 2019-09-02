/** Schema representing a H4I member
 * Role should be one of the following: [Director, Lead, Member, Pending]
 */
const mongoose = require('mongoose')

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  key: { type: String },
  role: { type: String, required: true },
  workspaceId: [{ type: String }]
})
module.exports = mongoose.model('User', User)
