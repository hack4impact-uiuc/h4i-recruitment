const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { Candidate, Stats, Match } = require('./models')
const { errorWrap, getStats } = require('./utils')
const cors = require('cors')
var XLSX = require('xlsx')

mongoose.connect(process.env.MONGO_URL)
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('hi')
})

app.get(
  '/candidates',
  errorWrap(async (req, res) => {
    try {
      const candidates = await Candidate.find()
      res.json({ result: candidates })
    } catch (err) {
      res.json(400, { message: err.message })
    }
  })
)

app.post(
  '/candidates',
  errorWrap(async (req, res) => {
    try {
      const c = new Candidate({
        name: 'Tim',
        email: 'other@gmail.com',
        graduationDate: '2018',
        major: 'CompE',
        resumeID: 'resume2.pdf',
        role: 'SWE'
      })
      await c.save()
    } catch (err) {
      res.json(400, { message: err.message })
    }
  })
)

app.get(
  '/candidates/:candidateId',
  errorWrap(async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.params.candidateId)
      res.json({ result: candidate })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
)

app.get('/matchCandidates', async (req, res) => {
  try {
    // not very efficient, nor should we have this algorithm for matches
    // TODO: change this to a better algorithm
    const candidates = await Candidate.aggregate([{ $sample: { size: 5 } }])
    const match = new Match({
      candidate1: candidates[0]._id,
      candidate2: candidates[1]._id
    })
    match.save()
    res.json({
      result: {
        candidate1: candidates[0],
        candidate2: candidates[1],
        matchID: match._id
      }
    })
  } catch (err) {
    res.json(400, { message: err.message })
  }
})

app.post('/matchCandidates', async (req, res) => {
  try {
    const data = req.body
    let match = await Match.findById(data.matchID)
    match.winnerID = data.winnerID
    match.save()
    res.json({ success: 'true' })
  } catch (err) {
    res.json(400, { message: err.message })
  }
})

app.get('/parse', async (req, res) => {
  const wb = XLSX.readFile('candidates.xlsx')
  const ws = wb.Sheets[wb.SheetNames[0]]
  var i = 0
  for (var elm in ws) {
    console.log(elm)
    i++
    if (i >= 10) break
  }

  res.send('hi')
})

app.get(
  '/matches',
  errorWrap(async (req, res) => {
    const matches = await Match.find()
    res.send({ result: matches })
  })
)

app.listen(8080, async () => console.log('Server listening on port 8080!'))

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message)
})
