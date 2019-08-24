const mongoose = require('mongoose')

/**
 * Partitions existing recruitment information into groups (aka "workspaces").
 *
 * name: name of the workspace. Functionally also a unique identifier.
 * owner: name of the owner of the workspace. Usually the creator, but can be transferred.
 */

const Workspace = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: String, required: true }
})
module.exports = mongoose.model('Workspace', Workspace)
