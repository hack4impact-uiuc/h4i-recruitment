/** Schema representing a H4I member
 * Role should be one of the following: [Director, Lead, Member, Pending]
 */
const mongoose = require('mongoose')

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  key: String,
  role: String,
  cycleId: mongoose.Schema.Types.ObjectId
})
module.exports = mongoose.model('User', User)
