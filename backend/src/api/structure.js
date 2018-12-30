const express = require('express')
const { Structure } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()
import roundData from '../../../data/roundData.js'

router.get(
  '/',
  errorWrap(async (req, res) => {
    const structure = await Structure.find()
    res.send({ result: structure })
  })
)

router.post(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    let response = 'Round Changed Sucessfully'
    let code = 404
    const newRound = req.body.round
    Structure.deleteMany({})
    const structure = new Structure({
      round: newRound
    })
    await structure.save()
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
