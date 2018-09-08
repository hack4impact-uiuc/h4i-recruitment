const express = require('express')
const router = express.Router()
const { errorWrap, leadsOnly } = require('../middleware')
const { Candidate, Comment } = require('../models')
const { statusEnum, yearsEnum, rolesEnum, gradEnum, enumToArray } = require('../utils/enums')
const { getGithubContributions } = require('../utils/gitScraper')

router.get(
  '/',
  [leadsOnly],
  errorWrap(async (req, res) => {
    let candidates
    if (req.query.status) {
      if (req.query.status === 'everyone') {
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
router.post(
  '/query',
  [leadsOnly],
  errorWrap(async (req, res) => {
    let filter = req.body.filters
    let sortFilters = {}
    let renamedSorts = Array.from(req.body.filters.sorts)
      .map(x => x.replace('Graduation Year', 'graduationDate'))
      .map(x => x.replace('Year', 'year'))
      .map(x => x.replace('Status', 'status'))
      .map(x => x.replace('Facemash Score', 'facemashRankings.elo'))
    Array.from(renamedSorts).forEach(x => (sortFilters[x] = 1))
    if (sortFilters['facemashRankings.elo']) {
      sortFilters['facemashRankings.elo'] = -1
    }

    let selectFilters = {}
    let renamedSelects = Array.from(req.body.filters.selectBy)
      .map(x => x.replace('Graduation Year', 'graduationDate'))
      .map(x => x.replace('Year', 'year'))
      .map(x => x.replace('Status', 'status'))
      .map(x => x.replace('Major', 'major'))
      .map(x => x.replace('Hours', 'hours'))
      .map(x => x.replace('Roles', 'role'))
      .map(x => x.replace('Name', 'name'))
      .map(x => x.replace('Resume', 'resume'))
      .map(x => x.replace('Website', 'website'))
      .map(x => x.replace('LinkedIn', 'linkedIn'))
      .map(x => x.replace('Facemash Score', 'facemashRankings.elo'))
      .map(x => x.replace('Number of Matches', 'facemashRankings.numOfMatches'))

    Array.from(renamedSelects).forEach(x => (selectFilters[x] = 1))
    // add github to the query as well, althought it isn't
    // a selectable in the frontend
    selectFilters.github = 1
    console.log(filter)
    let candidates = await Candidate.find()
      .select(selectFilters)
      .find({ status: filter.status })
      .find({ year: filter.year })
      .find({ graduationDate: filter.graduationDate })
      .find({ role: { $in: filter.roles } })
      .sort(sortFilters)
    res.json({ result: candidates })
  })
)

// TODO: Fix
router.post(
  '/',
  [leadsOnly],
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
    res.json({ status: 'success', message: 'Successfully added Candidate' })
  })
)

// Initialize endpoints generate dummy data for development purposes

router.get(
  '/initialize-git',
  errorWrap(async (req, res) => {
    const candidates = await Candidate.find()
    candidates.map(async candidate => {
      if (!candidate.github) {
        await Candidate.findByIdAndUpdate(candidate._id, { githubContributions: 'N/A' })
      } else {
        let contributions = await getGithubContributions(candidate.github)
        await Candidate.findByIdAndUpdate(candidate._id, { githubContributions: contributions })
      }
    })
    res.send('done updating')
  })
)

router.get(
  '/initialize-status',
  errorWrap(async (req, res) => {
    const candidates = await Candidate.find()
    candidates.map(async candidate => {
      await Candidate.findByIdAndUpdate(candidate._id, { status: statusEnum.PENDING })
    })
    res.send('Set all status to Pending')
  })
)

router.get(
  '/initialize-year',
  errorWrap(async (req, res) => {
    const candidates = await Candidate.find()
    const years = enumToArray(yearsEnum)
    candidates.map(async candidate => {
      let idx = Math.floor(Math.random() * years.length)
      await Candidate.findByIdAndUpdate(candidate._id, { year: years[idx] })
    })
    res.send('Initialize Years')
  })
)

router.get(
  '/initialize-gradyear',
  errorWrap(async (req, res) => {
    const candidates = await Candidate.find()
    const gradyears = enumToArray(gradEnum)
    candidates.map(async candidate => {
      let idx = Math.floor(Math.random() * gradyears.length)
      await Candidate.findByIdAndUpdate(candidate._id, { graduationDate: gradyears[idx] })
    })
    res.send('Initialize gradyears')
  })
)

router.get(
  '/initialize-role',
  errorWrap(async (req, res) => {
    const candidates = await Candidate.find()
    const roles = enumToArray(rolesEnum)
    candidates.map(async candidate => {
      let idx = Math.floor(Math.random() * roles.length)
      let idx2 = Math.floor(Math.random() * roles.length)
      if (idx == 3) {
        await Candidate.findByIdAndUpdate(candidate._id, { role: [roles[idx], roles[idx2]] })
      } else {
        await Candidate.findByIdAndUpdate(candidate._id, { role: [roles[idx]] })
      }
    })
    res.send('Initialized Roles')
  })
)

router.post(
  '/:candidateId/status',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Status set Sucessfully'
    let code = 200
    const candidateId = req.params.candidateId
    switch (data.status) {
      case statusEnum.PENDING:
        await Candidate.findByIdAndUpdate(candidateId, {
          $set: {
            lastStatusChangeByUser: { name: req._key_name, key: req._key },
            status: statusEnum.PENDING
          }
        })
        break
      case statusEnum.ACCEPTED:
        await Candidate.findByIdAndUpdate(candidateId, {
          $set: {
            lastStatusChangeByUser: { name: req._key_name, key: req._key },
            status: statusEnum.ACCEPTED
          }
        })
        break
      case statusEnum.INTERVIEWING:
        await Candidate.findByIdAndUpdate(candidateId, {
          $set: {
            lastStatusChangeByUser: { name: req._key_name, key: req._key },
            status: statusEnum.INTERVIEWING
          }
        })
        break
      case statusEnum.DENIED:
        await Candidate.findByIdAndUpdate(candidateId, {
          $set: {
            lastStatusChangeByUser: { name: req._key_name, key: req._key },
            status: statusEnum.DENIED
          }
        })
        break
      default:
        response = 'Invalid status, please try again'
        code = 400
    }
    res.status(code).json({ message: response, code, success: code < 400 })
  })
)

router.get(
  '/:candidateId',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const candidate = await Candidate.findById(req.params.candidateId)
    res.json({ result: candidate, success: true, code: 200 })
  })
)

router.post(
  '/:candidateId/comments',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const data = req.body
    if (data.comment == undefined) {
      res.status(400).json({
        message: 'Comment Empty. Provide comment in Request body',
        status: 400,
        success: false
      })
    } else {
      const newComment = new Comment({
        writerId: req._key,
        writerName: req._key_name,
        text: data.comment
      })
      const candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, {
        $push: { comments: newComment }
      })

      res.json({
        message: `Successfully added comment to user ${candidate._id}`,
        status: 200,
        success: true
      })
    }
  })
)

module.exports = router
