var XLSX = require('xlsx')
var mongoose = require('mongoose')
var Candidate = require('./models/candidate')
var {statusEnum} = require('./enums')
var { getGithubContributions } = 

mongoose.connect(process.env.MONGO_URL)
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const wb = XLSX.readFile(__dirname + '/candidates.xlsx')
const ws = wb.Sheets[wb.SheetNames[0]]

const jsonSheet = XLSX.utils.sheet_to_json(ws)
jsonSheet.map(async candidate => {
  let githubContributions = 'N/A'
  if (candidate.Github) {
    githubContributions = await getGithubContributions(candidate.Github)
  }
  const newCandidate = new Candidate({
    name: candidate.Name,
    email: candidate.Email,
    graduationDate: candidate['Graduation Date'],
    status: statusEnum.PENDING,
    major: candidate.Major,
    minor: candidate.Minor,
    resumeID: candidate.Resume,
    github: candidate.Github,
    linkedIn: candidate.LinkedIn,
    website: candidate.Website,
    role: candidate['Which role(s) are you applying for? '].split(", "),
    githubContributions: githubContributions,
    roleReason:
      candidate[
        'For each role you have selected, please elaborate why you are applying for that role and why you would be a good fit.'
      ],
    joinReason:
      candidate['Why do you want to join Hack4Impact, and what do you hope to gain from it?'],
    timeCommitment: candidate['Please list your time commitments'],
    timeCanDevote: candidate['How much time can you devote to Hack4Impact per week?'],
    techExperience:
      candidate[
        'List technical/design experience (classes taken, side projects, internships, class projects, portfolio link)'
      ],
    howTheyKnowUs: candidate['How did you hear about us?'],
    additionalComments: candidate['Any additional comments?'],
    interviews: [
      {
        timeCommitmentNotes: candidate['Time Commitment'],
        dedicationToCommunityNotes: candidate['Dedication to Community'],
        techCompetenceNotes: candidate['Technical Competence '],
        otherNotes: candidate.Notes,
        interviewer: candidate.Interviewers
      }
    ]
  })
  newCandidate.save()
})
// async function f () {
//   const arr = await Candidate.find()

//   arr.map((candidate, idx) => {
//     if (idx > 2) {
//       // candidate.set({roleReason: jsonSheet[idx - 2]['For each role you have selected, please elaborate why you are applying for that role and why you would be a good fit.']})
//       candidate.set({timeCanDevote: jsonSheet[idx - 2]['How much time can you devote to Hack4Impact per week?']})
//       candidate.save()
//     }
//   })
// }
// f()
console.log('Done Parsing & adding to Database... Ctrl-C to Quit')
