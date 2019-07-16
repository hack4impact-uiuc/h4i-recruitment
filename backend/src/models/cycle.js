const mongoose = require('mongoose')

/**
 * Holds information about a recruitment cycle; attributes are subject to change.
 *
 * term: (for example) SP19, FA20
 * workspaceName: full name of the workspace that a cycle is associated with (Georgia Tech Hack4Impact and
 * not GaTech H4I). This is a strong suggestion but not enforced!
 */

const Cycle = new mongoose.Schema({
  term: { type: String, required: true },
  workspaceName: { type: String, required: true }
})
module.exports = mongoose.model('Cycle', Cycle)
