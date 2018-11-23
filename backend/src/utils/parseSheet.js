/*
 * this script is used to parse the generated excel sheet
 * from google forms and create Candidates out of that
 */
var XLSX = require('xlsx')
var mongoose = require('mongoose')
var Candidate = require('../models/candidate')
var { statusEnum, yearsEnum, gradEnum } = require('./enums')
var { getGithubContributions } = require('./gitScraper')

mongoose.connect(process.env.MONGO_URL)
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const wb = XLSX.readFile(__dirname + '/candidates.xlsx')
const ws = wb.Sheets[wb.SheetNames[0]]

const jsonSheet = XLSX.utils.sheet_to_json(ws)
function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function parseStuff () {
  await sleep(3000)
  for (let i = 0; i < jsonSheet.length; i++) {
    let candidate = jsonSheet[i]
    console.log(candidate.Name)
    let githubContributions = 'N/A'
    if (candidate['Github Link']) {
      githubContributions = await getGithubContributions(candidate['Github Link'])
    }
    let year = null
    switch (candidate['Graduation Date']) {
      case gradEnum.SP19:
        year = yearsEnum.SENIOR
        break
      case gradEnum.FA19:
        year = yearsEnum.JUNIOR
        break
      case gradEnum.SP20:
        year = yearsEnum.JUNIOR
        break
      case gradEnum.FA20:
        year = yearsEnum.SOPHOMORE
        break
      case gradEnum.SP21:
        year = yearsEnum.SOPHOMORE
        break
      case gradEnum.FA21:
        year = yearsEnum.SOPHOMORE
        break
      case gradEnum.SP22:
        year = yearsEnum.FRESHMAN
        break
    }
    if (year == null) {
      console.log(`WEIRD GRAD DATE ${candidate.Name}`)
    }
    let newCandidate = new Candidate({
      name: candidate.Name,
      email: candidate['Email Address'],
      graduationDate: candidate['Graduation Date'],
      status: statusEnum.PENDING,
      major: candidate.Major,
      minor: candidate['Minor(s)'],
      resumeID: candidate.Resume,
      github: candidate['Github Link'],
      linkedIn: candidate.LinkedIn,
      website: candidate.Website,
      role: candidate['Which role(s) are you applying for? '].split(', '),
      githubContributions: githubContributions,
      year: year,
      classesTaken:
        candidate['Which classes have you taken?'] != undefined
          ? candidate['Which classes have you taken?'].split(', ')
          : [],
      roleReason:
        candidate[
          'For each role you have selected, please elaborate why you are applying for that role and why you would be a good fit.'
        ],
      joinReason:
        candidate['Why do you want to join Hack4Impact, and what do you hope to gain from it?'],
      timeCommitment: candidate['Please list your time commitments'],
      techExperience:
        candidate[
          'List technical/design experience (side projects, internships, class projects, portfolio link, additional classes)'
        ],
      howTheyKnowUs: candidate['How did you hear about us?'],
      additionalComments: candidate['What else should we know about you?'],
      interviews: [
        {
          timeCommitmentNotes: candidate['Please list your time commitments'],
          dedicationToCommunityNotes: candidate['Dedication to Community'],
          techCompetenceNotes: candidate['Technical Competence '],
          otherNotes: candidate.Notes,
          interviewer: candidate.Interviewers
        }
      ]
    })
    // save errors out if candidate doesn't match the schema
    const res = await newCandidate.save()
    console.log(res)
    await sleep(500)
  }
}

parseStuff()

console.log('Done Parsing & adding to Database... Ctrl-C to Quit')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('ERROR: unhandledRejection, did you run `dotenv` before yarn dev?', error.message)
  process.exit(1)
})
