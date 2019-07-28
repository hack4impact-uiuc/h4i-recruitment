const mongoose = require('mongoose')

/**
 * Holds information about a recruitment cycle; attributes are subject to change.
 *
 * term: first 2 letters of the season followed by last 2 digits of the year (i.e. SP19, FA20)
 * workspaceName: full name of the workspace that a cycle is associated with (Georgia Tech Hack4Impact and
 * not GaTech H4I). This is a strong suggestion but not enforced!
 */

const Cycle = new mongoose.Schema({
  term: { type: String, required: true },
  workspaceName: { type: String, required: true },
  current: { type: Boolean, default: true }
})

module.exports = mongoose.model('Cycle', Cycle)
