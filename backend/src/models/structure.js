const mongoose = require('mongoose')

/**
 * Structure is kind of a dumb name for this, but structure will hold any information pertaining to how rounds are configured/determinted/etc.
 * As such, there should only be one row in this at a time.
 * Currently, this only holds the current round but may hold more in the future.
 */

const Structure = new mongoose.Schema({
  round: Number
})
module.exports = mongoose.model('Structure', Structure)
