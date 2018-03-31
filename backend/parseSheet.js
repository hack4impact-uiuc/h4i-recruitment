var XLSX = require('xlsx')
var mongoose = require('mongoose')
var { Candidate } = require('./model')

mongoose.connect('mongodb://tko:tko@ds229549.mlab.com:29549/h4i-recruitment')
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const wb = XLSX.readFile('candidates.xlsx')
const ws = wb.Sheets[wb.SheetNames[0]]

const jsonSheet = XLSX.utils.sheet_to_json(ws)
var i = 0
const candidate = jsonSheet[13]
console.log('candidate: ', candidate);
const newCandidate = new Candidate({
  name: candidate.Name,
  email: candidate.Email,
  graduationDate: candidate['Graduation Date'],
  major: candidate.Major,
  minor: candidate.Minor,
  resumeID: candidate.Resume,
  github: candidate.Github,
  linkedIn: candidate.LinkedIn,
  website: candidate.Website,
  role: candidate['Which role(s) are you applying for? '],
  roleReason: candidate['For each role you have selected, please elaborate why you are applying for that role and why youwould be a good fit.'],
  joinReason: candidate['Why do you want to join Hack4Impact, and what do you hope to gain from it?'],
  timeCommitment: candidate['Please list your time commitments'],
  timeCanDevote: candidate['8 hrs'],
  techExperience: candidate['List technical/design experience (classes taken, side projects, internships, class projects, portfolio link)'],
  howTheyKnowUs: candidate['How did you hear about us?'],
  additionalComments: candidate['Any additional comments?'],
  interviews: [{
    timeCommitmentNotes: candidate['Time Commitment'],
    dedicationToCommunityNotes: candidate['Dedication to Community'],
    techCompetenceNotes: candidate['Technical Competence '],
    otherNotes: candidate.Notes,
    interviewer: candidate.Interviewers
  }]
})
newCandidate.save()
