var mongoose = require('mongoose')
const Candidate = require('../models/candidate')
const fs = require('fs')

mongoose.connect(process.env.MONGO_URL)
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))
// generated the code in populate.js... leaving this code here for reference if ever needed again
const createCode = async () => {
  const candidates = await Candidate.find()
  let text = ''
  for (var i = 0; i < candidates.length; i++) {
    var candidate = candidates[i]
    text += `
    let newCandidate = new Candidate({
      name: "${candidate.name}",
      email: "${candidate.email}",
      graduationDate: "${candidate.graduationDate}",
      status: "${candidate.status}",
      major: "${candidate.major}",
      gender: "male",
      minor: "${candidate.minor}",
      resumeID: "${candidate.resumeID}",
      github: "${candidate.github}",
      linkedIn: "${candidate.linkedIn}",
      website: "${candidate.website}",
      role: "${candidate.role != undefined ? candidate.role : []}",
      githubContributions: "${candidate.githubContributions}",
      year: "${candidate.year}",
      classesTaken: "${candidate.classesTaken != undefined ? candidate.classesTaken : []}",
      roleReason: "${candidate.roleReason}",
      joinReason: "${candidate.joinReason}",
      timeCommitment: "${candidate.timeCommitment}",
      techExperience: "${candidate.techExperience}",
      howTheyKnowUs: "${candidate.howTheyKnowUs}",
      additionalComments: "${candidate.additionalComments}",
    })
    newCandidate.save()
    `
  }
  fs.writeFile('populate.js', text, function(err) {
    console.log(err)
  })
}

createCode().then(res => {
  mongoose.connection.close()
})

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('ERROR: unhandledRejection, did you run `dotenv` before yarn dev?', error.message)
  process.exit(1)
})
