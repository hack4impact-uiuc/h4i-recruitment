const mongoose = require('mongoose')

/**
 * Partitions existing recruitment information into groups (aka "workspaces").
 *
 * name: name of the workspace. Functionally also a unique identifier.
 * owner: owner of the workspace [type: User]. Usually the creator, but can be transferred.
 */

const Workspace = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true }
})
module.exports = mongoose.model('Workspace', Workspace)
