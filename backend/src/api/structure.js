const express = require('express')
const { Structure } = require('../models')
const { directorsOnly, errorWrap } = require('../middleware')
const router = express.Router()

router.get(
  '/',
  errorWrap(async (req, res) => {
    const structure = await Structure.findOne()
    res.send({ result: structure })
  })
)

router.post(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    let response = 'Round Changed Successfully'
    let code = 404
    const newRound = req.body.round
    await Structure.remove({})
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
