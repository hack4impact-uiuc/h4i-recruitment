const express = require('express')
const router = express.Router()
const {
  interview,
  futureInterview,
  candidates,
  matchCandidates,
  matches,
  structure,
  events,
  attendees
} = require('./api')
var XLSX = require('xlsx')

// mydomain.com/
router.get('/', (req, res) => {
  res.send('hi')
})

// sets up the routers defined in the module /src/api
router.use('/interviews', interview)
router.use('/schedule', futureInterview)
router.use('/candidates', candidates)
router.use('/matchCandidates', matchCandidates)
router.use('/matches', matches)
router.use('/structure', structure)
router.use('/events', events)
router.use('/attendees', attendees)

module.exports = router
