const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { Candidate, Stats } = require('./models')
const { errorWrap, getStats } = require('./utils')
const cors = require('cors')
var XLSX = require('xlsx')

mongoose.connect('mongodb://tko:tko@ds229549.mlab.com:29549/h4i-recruitment')
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

app.get('/candidates', errorWrap(async (req, res) => {
  try {
    const candidates = await Candidate.find()
    res.json({ 'result': candidates })
  } catch (err) {
    res.json(400, { 'message': err.message })
  }
}))

app.post('/candidates', async (req, res) => {
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
    res.json(400, { 'message': err.message })
  }
})

app.get('/candidates/:candidateId', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId)
    res.json({ 'result': candidate })
  } catch (err) {
    res.status(400).json({ 'message': err.message })
  }
})

app.get('/matchCandidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort('facemashRankings.total').limit(2)
    res.json({ 'result': candidates })
  } catch (err) {
    res.json(400, { 'message': err.message })
  }
})

app.post('/matchCandidates', async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    res.json({ 'result': data })
  } catch (err) {
    res.json(400, { 'message': err.message })
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

app.listen(8080, async () => {
  console.log('Server listening on port 8080!')
  const stats = await getStats()
  console.log(stats)
})

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message)
})
