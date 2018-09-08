const express = require('express')
const router = express.Router()
const { errorWrap } = require('./middleware')
const { interview, candidates, matchCandidates, matches } = require('./api')
var XLSX = require('xlsx')

// mydomain.com/
router.get('/', (req, res) => {
  res.send('hi')
})

router.use('/interview', interview)
router.use('/candidates', candidates)
router.use('/matchCandidates', matchCandidates)
router.use('/matches', matches)

module.exports = router
