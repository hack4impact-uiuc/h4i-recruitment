const express = require('express')
const { Match } = require('../models')
const { errorWrap } = require('../middleware')
const router = express.Router()

router.get(
  '/',
  errorWrap(async (req, res) => {
    const matches = await Match.find()
    res.send({ result: matches })
  })
)

module.exports = router
