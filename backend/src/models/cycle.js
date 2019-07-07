const mongoose = require('mongoose')

/**
 * Holds information about a recruitment cycle; attributes are subject to change.
 *
 * term: (for example) SP19, FA20
 * chapter: (or school) UIUC, GaTech
 */

const Cycle = new mongoose.Schema({
  term: String,
  chapter: String
})
module.exports = mongoose.model('Cycle', Cycle)
