const express = require('express')
const { Cycle } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()

// Get all cycles (previous and current)
// TODO: when authentication server is integrated, only show the cycles that
// belong to the caller of this endpoint.
router.get(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const cycles = await Cycle.find()
    res.json({
      code: 200,
      result: cycles,
      success: true
    })
  })
)

// Get a cycle by ID
// TODO: when authentication server is integrated, only show the cycle id if it belongs
// to the workspace owned by the caller. Otherwise, 404.
router.get(
  '/:cycle_id',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const cycleId = req.params.cycle_id
    const cycle = await Cycle.findById(cycleId)
    res.json({
      code: 200,
      result: cycle,
      success: true
    })
  })
)

// get all cycles belonging to a workspace (either current, outdated, or both)
// TODO: when authentication server is integrated, only show the cycles
// to the workspace's owner. Otherwise, 404.
router.get(
  '/workspace/:workspaceName',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspaceName = req.params.workspaceName
    const current = req.body.current

    if (!workspaceName) {
      res.json({
        code: 400,
        message: 'malformed request',
        success: false
      })
    }

    const cycles =
      current !== null
        ? await Cycle.find({ workspaceName, current })
        : await Cycle.find({ workspaceName })

    res.json({
      code: 200,
      result: cycles,
      success: true
    })
  })
)

// Create a new cycle
router.post(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    let response = 'Cycle Created Successfully'
    let code = 400

    const newTerm = req.body.term
    const workspace = req.body.workspaceName

    if (!newTerm) {
      response = 'Invalid term'
    }
    if (!workspace) {
      response = 'Invalid workspace'
    }

    // set the last current cycle to not-current
    Cycle.findOneAndUpdate(
      { workspaceName: workspace, current: true },
      { $set: { current: false } },
      err => {
        if (err) {
          res.json({
            code: 400,
            message: err.message,
            result: {},
            success: false
          })
        }
      }
    )

    // TODO: when authentication server is integrated, ensure that given workspaces
    // matches one in the database created by the director

    const cycle = new Cycle({
      term: newTerm,
      workspaceName: workspace
    })
    await cycle.save()

    code = 200
    res.json({
      code,
      message: response,
      result: {},
      success: true
    })
  })
)

module.exports = router
