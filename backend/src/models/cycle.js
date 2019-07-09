const mongoose = require('mongoose')

/**
 * Holds information about a recruitment cycle; attributes are subject to change.
 *
 * term: (for example) SP19, FA20
 * chapter: (full name) University of Illinois at Urbana-Champaign (not UIUC), Georgia Institute of Technology (not GaTech)
 */

const Cycle = new mongoose.Schema({
  term: { type: String, required: true },
  chapter: { type: String, required: true }
})
module.exports = mongoose.model('Cycle', Cycle)
