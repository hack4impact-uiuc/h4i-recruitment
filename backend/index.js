const express = require('express')
const mongoose = require('mongoose')
const Candidate = require('./model')

mongoose.connect('mongodb://tko:tko@ds229549.mlab.com:29549/h4i-recruitment')
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const app = express()

app.get('/', (req, res) => {
  res.send('hi')
})

app.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find()
    res.json({ 'result': candidates })
  } catch (err) {

  }
  const c = new Candidate({
    name: 'Tim',
    email: 'timothy@gmail.com',
    graduationDate: '2018',
    major: 'CompE',
    resumeID: 'resume.pdf',
    role: 'SWE'
  })
  await c.save()
})

app.post('/candidates', async (req, res) => {
  try {
    const c = new Candidate({
      name: 'Tim',
      email: 'timothy@gmail.com',
      graduationDate: '2018',
      major: 'CompE',
      resumeID: 'resume.pdf',
      role: 'SWE'
    })
    await c.save()
  } catch (err) {
    res.json(400, { 'message': err.message })
  }
})

app.get('/candidates/:candidateId', (req, res) => {
  const candidate = Candidate.findById(req.params.candidateId)
  res.json({ 'result': candidate })
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message)
})
