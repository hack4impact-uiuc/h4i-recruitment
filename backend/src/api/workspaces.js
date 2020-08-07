const express = require('express')
const { User, Workspace } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()

// Get all workspaces belonging to whoever called the endpoint.
router.get(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspaces = await Workspace.find({ owner: req.user })
    res.json({
      code: 200,
      result: workspaces,
      success: true
    })
  })
)

// Find workspace by name, if they belong to the caller.
router.get(
  '/:workspaceName',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspace = await Workspace.find({ name: req.params.workspaceName, owner: req.user })

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
    const owner = req.user
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

    // add the workspace to the list of workspaces for a user
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $push: { workspaceIds: workspaceName } }
    )

    res.json({
      code: 200,
      message: 'Successfully created workspace',
      success: true
    })
  })
)

router.put(
  '/addUser',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const userEmail = req.body.userEmail
    const workspaceName = req.body.workspaceIds

    if (!userEmail || !workspaceName) {
      return res.json({
        code: 400,
        message: 'malformed request',
        success: false
      })
    }

    if (!req.user.workspaceIds.includes(workspaceName)) {
      return res.json({
        code: 403,
        message: 'unauthorized',
        success: false
      })
    }

    // adds the workspace to the user's list of workspaces
    await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { workspaceIds: workspaceName } },
      err => {
        if (err) {
          return res.json({
            code: 404,
            message: 'user not found',
            result: {},
            success: false
          })
        }
      }
    )

    res.json({
      code: 200,
      success: true,
      message: 'added user to new workspace!'
    })
  })
)
// Transfer ownership of a workspace to someone else
router.put(
  '/transfer/:workspaceName',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const newOwner = (await User.find({ email: req.body.userEmail }))[0]
    const workspace = req.params.workspaceName
    if (!newOwner || !workspace) {
      return res.json({
        code: 400,
        message: 'malformed request',
        success: false
      })
    }

    if (!newOwner.workspaceIds.includes(workspace) || newOwner.role != 'Director') {
      return res.json({
        code: 400,
        message: 'Invalid permissions for new owner',
        success: false
      })
    }

    await Workspace.findOneAndUpdate({ name: workspace }, { $set: { owner: newOwner } })

    res.json({
      code: 200,
      message: `Successfully transferred ownership for Workspace ${workspace}`,
      success: true
    })
  })
)

module.exports = router
