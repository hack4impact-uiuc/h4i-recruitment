const express = require('express')
const router = express.Router()
const { interview, candidates, matchCandidates, matches } = require('./api')
var XLSX = require('xlsx')

// mydomain.com/
router.get('/', (req, res) => {
  res.send('hi')
})

// sets up the routers defined in the module /src/api
router.use('/interviews', interview)
router.use('/candidates', candidates)
router.use('/matchCandidates', matchCandidates)
router.use('/matches', matches)

module.exports = router
