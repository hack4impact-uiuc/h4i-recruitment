const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const querystring = require('querystring')
const { Candidate, Stats, Match } = require('./models')
const { getStats } = require('./utils')
const { errorWrap } = require('./middleware')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
var XLSX = require('xlsx')

mongoose.connect(process.env.MONGO_URL)
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const app = express()

app.get('/', (req, res) => {
  res.send('hi')
})

app.get(
  '/candidates',
  errorWrap(async (req, res) => {
    let candidates
    if (req.query.status) {
      if (req.query.status == 'everyone') {
        candidates = await Candidate.find()
      } else {
        candidates = await Candidate.find({ status: req.query.status })
      }
    } else {
      candidates = await Candidate.find()
    }
    res.json({ result: candidates })
  })
)

app.post(
  '/candidates',
  errorWrap(async (req, res) => {
    const c = new Candidate({
      name: 'Tim',
      email: 'other@gmail.com',
      graduationDate: '2018',
      major: 'CompE',
      resumeID: 'resume2.pdf',
      role: 'SWE'
    })
    await c.save()
  })
)

app.get(
  '/candidates/:candidateId',
  errorWrap(async (req, res) => {
    const candidate = await Candidate.findById(req.params.candidateId)
    res.json({ result: candidate })
  })
)

app.get(
  '/matchCandidates',
  errorWrap(async (req, res) => {
    // not very efficient, nor should we have this algorithm for matches
    // TODO: change this to a better algorithm
    const candidates = await Candidate.aggregate([{ $sample: { size: 5 } }])
    // create the match
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
  })
)

app.post(
  '/matchCandidates',
  errorWrap(async (req, res) => {
    const data = req.body

    // given the matchID that was passed from the backend
    // when a match was created
    // This will verify whether the match exists
    // so any frontend client can't "fake" a match
    let match = await Match.findById(data.matchID)
    match.winnerID = data.winnerID // update the winner
    match.save()
    res.json({ success: 'true' })
  })
)

app.get(
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

app.post(
  '/set-status/',
  errorWrap(async (req, res) => {
    data = req.body
    let response = 'Status set Sucessfully'
    switch (data.status) {
      case 'pending':
        await Candidate.findByIdAndUpdate(data.id, { status: 'pending' })
        break
      case 'accepted':
        await Candidate.findByIdAndUpdate(data.id, { status: 'accepted' })
        break
      case 'interviewing':
        await Candidate.findByIdAndUpdate(data.id, { status: 'interviewing' })
        break
      case 'rejected':
        await Candidate.findByIdAndUpdate(data.id, { status: 'rejected' })
        break
      default:
        response = 'Invalid status, please try again'
    }
    res.json({ result: response })
  })
)

app.get(
  '/initialize-status',
  errorWrap(async (req, res) => {
    await Candidate.update({}, { status: 'pending' }, { multi: true }, err => {
      if (err) {
        console.log(err.message)
      }
    })
    res.send('Set all status to pending')
  })
)

app.get(
  '/matches',
  errorWrap(async (req, res) => {
    const matches = await Match.find()
    res.send({ result: matches })
  })
)

app.use(cors())
app.use(bodyParser.json())
app.use(errorHandler)

app.listen(8080, async () => console.log('Server listening on port 8080!'))

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('ERROR: unhandledRejection, did you run `dotenv` before yarn dev?', error.message)
  process.exit(1)
})
