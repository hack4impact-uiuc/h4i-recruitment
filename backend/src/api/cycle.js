const express = require('express')
const mongodb = require('mongodb')
const { Cycle } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()

// Get all cycles (previous and current)
router.get(
  '/',
  errorWrap(async (req, res) => {
    const cycle = await Cycle.find()
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
    let code = 404
    // TODO: not sure if this should be 404 here

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
