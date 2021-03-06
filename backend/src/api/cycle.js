const express = require('express')
const { Cycle, Workspace } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()

// Get all cycles belonging to the same workspace that a User is in (previous and current)
router.get(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const cycles = await Cycle.find({ workspaceName: { $in: req.user.workspaceIds } })
    res.json({
      code: 200,
      result: cycles,
      success: true
    })
  })
)

// Get a cycle by ID, if the cycle is in the same workspace as the caller of the endpoint.
// to the workspace owned by the caller. Otherwise, 403.
router.get(
  '/id/:cycle_id',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const cycleId = req.params.cycle_id
    const cycle = await Cycle.findById(cycleId)
    if (!cycle) {
      return res.json({
        code: 404,
        message: 'Not found',
        success: false
      })
    }

    // cycle exists but is under a different workspace
    if (!req.user.workspaceIds.includes(cycle.workspaceName)) {
      return res.json({
        code: 403,
        message: 'Unauthorized',
        success: false
      })
    }

    res.json({
      code: 200,
      result: cycle,
      success: true
    })
  })
)

// get all cycles belonging to a specified workspace. The caller must belong to that workspace.
router.get(
  '/workspace/:workspaceName',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspace = req.params.workspaceName
    const current = req.query.current
    if (!workspace || !req.user.workspaceIds.includes(workspace)) {
      res.json({
        code: 400,
        message: 'malformed request',
        success: false
      })
      return
    }
    const cycles =
      current == 'true'
        ? await Cycle.find({ workspaceName: workspace, current })
        : await Cycle.find({ workspaceName: workspace })

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
    const newTerm = req.body.term
    const workspaceName = req.body.workspaceName

    if (!newTerm || !workspaceName || !req.user.workspaceIds.includes(workspaceName)) {
      res.json({
        code: 400,
        message: 'Malformed Request',
        success: false
      })
      return
    }

    // set the last current cycle to not-current
    Cycle.findOneAndUpdate(
      { workspaceName, current: true },
      { $set: { current: false } },
      (err, result) => {
        if (err) {
          res.json({
            code: 400,
            message: err.message,
            result: {},
            success: false
          })
          return
        }
      }
    )

    const cycle = new Cycle({
      term: newTerm,
      workspaceName
    })
    await cycle.save()

    res.json({
      code: 200,
      message: 'Cycle Created Successfully',
      result: {},
      success: true
    })
  })
)

router.put(
  '/setCurrent/:workspaceName/:cycleId',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspaceName = req.params.workspaceName
    const cycleId = req.params.cycleId
    // set the last current cycle to not-current
    await Cycle.findOneAndUpdate(
      { workspaceName, current: true },
      { $set: { current: false } },
      err => {
        if (err) {
          return res.json({
            code: 400,
            message: err.message,
            result: {},
            success: false
          })
        }
      }
    )

    // todo: ensure that new owner is a director & belongs in the same org
    await Cycle.findOneAndUpdate({ _id: cycleId }, { $set: { current: true } }, err => {
      if (err) {
        return res.json({
          code: 400,
          message: err.message,
          result: {},
          success: false
        })
      }
    })

    res.json({
      code: 200,
      message: `Successfully set cycle as current`,
      success: true
    })
  })
)

module.exports = router
