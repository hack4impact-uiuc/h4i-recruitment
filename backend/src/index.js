const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const querystring = require('querystring')
const { Candidate, Stats, Match } = require('./models')
const { getStats } = require('./utils')
const { errorWrap, errorHandler } = require('./middleware')
const candidates = require('./candidates')
const matchCandidates = require('./matchCandidates')
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

app.use('/candidates', candidates)
app.use('/matchCandidates', matchCandidates)

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

app.use(cors())
app.use(bodyParser.json())
app.use(errorHandler)

app.listen(8080, async () => console.log('Server listening on port 8080!'))

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('ERROR: unhandledRejection, did you run `dotenv` before yarn dev?', error.message)
  process.exit(1)
})
