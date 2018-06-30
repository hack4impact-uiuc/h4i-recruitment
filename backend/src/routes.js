const express = require('express')
const router = express.Router()
const { errorWrap } = require('./middleware')
const { candidates, matchCandidates, matches } = require('./api')
var XLSX = require('xlsx')

// mydomain.com/
router.get('/', (req, res) => {
  res.send('hi')
})

// used to parse excel sheet and enter
// candidate data into database
router.get(
  '/parse',
  errorWrap(async (req, res) => {
    const wb = XLSX.readFile(__dirname + '/candidates.xlsx')
    const ws = wb.Sheets[wb.SheetNames[0]]
    var i = 0
    for (var elm in ws) {
      console.log(elm)
      i++
      if (i >= 10) break
    }

    res.send('hi')
  })
)

router.use('/candidates', candidates)
router.use('/matchCandidates', matchCandidates)
router.use('/matches', matches)

module.exports = router
