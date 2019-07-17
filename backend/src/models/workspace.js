const mongoose = require('mongoose')

/**
 * Partitions existing recruitment information into groups (aka "workspaces").
 *
 * name: name of the workspace. Functionally also a unique identifier.
 * creator: name of the director who created the workspace
 */

const Workspace = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  creator: { type: String, required: true }
})
module.exports = mongoose.model('Workspace', Workspace)
