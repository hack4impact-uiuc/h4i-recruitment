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
  '/:workspace_name',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspaceName = req.params.workspace_name

    if (!workspaceName) {
      return res.json({
        code: 400,
        message: 'malformed request',
        success: false
      })
    }

    const workspace = await Workspace.find({ workspaceName })

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
    const workspaceName = req.body.workspaceName

    if (!creator || !workspaceName) {
      return res.json({
        code: 400,
        message: creator ? 'Invalid owner name' : 'Invalid workspace name',
        success: false
      })
    }

    const workspace = new Workspace({
      workspaceName,
      creator
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
  '/transfer',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const newOwner = req.body.owner
    const name = req.body.name

    if (!creator || !workspaceName) {
      return res.json({
        code: 400,
        message: creator ? 'Invalid owner name' : 'Invalid workspace name',
        success: false
      })
    }

    // todo: ensure that new owner is a director & belongs in the same org
    await Workspace.findByIdAndUpdate(
      { name },
      { $set: { owner: newOwner } },
      { new: true }
    )

    res.json({
      code: 200,
      success: true
    })
  })
)
module.exports = router
