const express = require('express')
const { Cycle } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()

// Get all cycles (previous and current)
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

// Create a new cycle
router.post(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    let response = 'Cycle Created Successfully'
    let code = 400

    const newTerm = req.body.term
    const newChapter = req.body.chapter

    if (!newTerm) {
      response = 'Invalid term'
    }
    if (!newChapter) {
      response = 'Invalid chapter'
    }

    const cycle = new Cycle({
      term: newTerm,
      chapter: newChapter
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
