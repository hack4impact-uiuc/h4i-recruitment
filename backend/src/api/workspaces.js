const express = require('express')
const { Workspace } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()

// Get all workspaces
// TODO: when authentication server is integrated, only show the workspace that
// belong to the caller of this endpoint.
router.get(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspaces = await Workspace.find()
    res.json({
      code: 200,
      result: workspaces,
      success: true
    })
  })
)

// Find workspace by name
// TODO: when authentication server is integrated, only show the workspace if it
// belongs to the caller of this endpoint.
router.get(
  '/:workspaceName',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspace = await Workspace.find({ name: req.params.workspaceName })

    res.json({
      code: 200,
      result: workspace,
      success: true
    })
  })
)

// Create a new workspace
router.post(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const owner = req.body.owner
    const workspaceName = req.body.name
    if (!owner || !workspaceName) {
      return res.json({
        code: 400,
        message: owner ? 'Invalid workspace name' : 'Invalid owner name',
        success: false
      })
    }

    const workspace = new Workspace({
      name: workspaceName,
      owner
    })
    await workspace.save()

    res.json({
      code: 200,
      message: 'Successfully created workspace',
      success: true
    })
  })
)

// Transfer ownership of a workspace to someone else
router.put(
  '/transfer/:workspaceName',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const newOwner = req.body.owner
    const workspaceName = req.params.workspaceName

    if (!newOwner || !workspaceName) {
      return res.json({
        code: 400,
        message: newOwner ? 'Invalid workspace name' : 'Invalid owner name',
        success: false
      })
    }

    // todo: ensure that new owner is a director & belongs in the same org
    await Workspace.findOneAndUpdate({ name: workspaceName }, { $set: { owner: newOwner } })

    res.json({
      code: 200,
      message: `Successfully transferred ownership for Workspace ${workspaceName}`,
      success: true
    })
  })
)

module.exports = router
