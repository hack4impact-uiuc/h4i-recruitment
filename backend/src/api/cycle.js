const express = require('express')
const { Cycle, Workspace } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()

// Get all cycles belonging to the same workspace that a User is in (previous and current)
router.get(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const cycles = await Cycle.find({ workspaceName: {"$in" : req._user.workspaceId} })
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
    if (cycle.length == 0) {
      res.json({
        code: 404,
        message: 'Not found',
        success: false
      })
      return
    }

    // cycle exists but is under a different workspace
    if (!req._user.workspaceId.includes(cycle.workspaceName)) {
      res.json({
        code: 403,
        message: 'Unauthorized',
        success: false
      })
      return
    }

    res.json({
      code: 200,
      result: cycle,
      success: true
    })
  })
)

// get all cycles belonging to the workspace that a user belongs to (either current, outdated, or both)
router.get(
  '/workspace',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const workspaceNames = req._user.workspaceId
    const current = req.body.current

    if (!workspaceNames || workspaceNames.length == 0) {
      return res.json({
        code: 400,
        message: 'malformed request',
        success: false
      })
    }
    const cycles =
      current === null
        ? await Cycle.find({ workspaceName: {"$in" : req._user.workspaceId} })
        : await Cycle.find({ workspaceName: {"$in" : req._user.workspaceId}, current })

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
    const workspaceName = req.body.workspaceName

    if (!newTerm) {
      response = 'Invalid term'
    }
    if (!workspace || !req._user.workspaceId.includes(workspace)) {
      response = 'Invalid workspace'
    } else {
      // TODO: check for a workspace owned by the creator of this cycle
      const workspace = Workspace.findOne({ name: workspaceName })
      if (!workspace) {
        // Shouldn't keep going if the workspace name doesn't link to one
        res.json({
          code,
          message: 'Invalid workspace',
          result: {},
          success: false
        })
      }
    }

    // set the last current cycle to not-current
    Cycle.findOneAndUpdate({ workspaceName, current: true }, { $set: { current: false } }, err => {
      if (err) {
        return res.json({
          code: 400,
          message: err.message,
          result: {},
          success: false
        })
      }
    })

    // TODO: when authentication server is integrated, ensure that given workspaces
    // matches one in the database created by the director

    const cycle = new Cycle({
      term: newTerm,
      workspaceName
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
