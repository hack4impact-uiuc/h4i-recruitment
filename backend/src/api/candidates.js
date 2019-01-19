const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')
const { errorWrap, leadsOnly } = require('../middleware')
const { Candidate, Comment, Interview } = require('../models')
const { statusEnum, yearsEnum, rolesEnum, gradEnum, enumToArray } = require('../utils/enums')
const { getGithubContributions } = require('../utils/gitScraper')

router.get(
  '/',
  [leadsOnly],
  errorWrap(async (req, res) => {
    let candidates
    if (req.query.status) {
      candidates = await Candidate.find({ status: req.query.status })
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
    // Required to validate the given "status"
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
      case statusEnum.REJECTED:
        await Candidate.findByIdAndUpdate(candidateId, {
          $set: {
            lastStatusChangeByUser: { name: req._key_name, key: req._key },
            status: statusEnum.REJECTED
          }
        })
        break
      case statusEnum.INVALID:
        await Candidate.findByIdAndUpdate(candidateId, {
          $set: {
            lastStatusChangeByUser: { name: req._key_name, key: req._key },
            status: statusEnum.INVALID
          }
        })
        break
      case statusEnum.DONE_INTERVIEWING:
        await Candidate.findByIdAndUpdate(candidateId, {
          $set: {
            lastStatusChangeByUser: { name: req._key_name, key: req._key },
            status: statusEnum.DONE_INTERVIEWING
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

router.post(
  '/:candidateId/interviews',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Interview Added Sucessfully'
    let code = 404
    let interviewerKey = data.interviewerKey
    let reqSections = data.sections
    let candidateId = data.candidateId
    let candidateName = data.candidateName
    let score = data.overallScore
    let genNotes = data.generalNotes
    let catNotes = data.categoryNotes
    let givenCategory = data.category

    if (interviewerKey === undefined) {
      response = 'Invalid interviewerKey'
    } else if (candidateId === undefined) {
      response = 'Invalid candidateId'
    } else if (candidateName === undefined) {
      response = 'Invalid candidateName'
    } else if (reqSections === undefined) {
      response = 'Invalid sections'
    } else if (score === undefined) {
      response = 'Invalid score'
    } else if (genNotes === undefined) {
      response = 'Invalid notes'
    } else {
      // await Candidate.findByIdAndUpdate(candidateId, { status: 'interviewing' })
      const interview = new Interview({
        interviewer_key: interviewerKey,
        interviewer_name: req._key_name,
        overall_score: score,
        candidate_id: candidateId,
        candidate_name: candidateName,
        general_notes: genNotes,
        category_notes: catNotes,
        sections: reqSections,
        category: givenCategory
      })
      await Candidate.findByIdAndUpdate(candidateId, {
        $push: { interviews: interview }
      })
      code = 200
    }
    res.json({
      code,
      message: response,
      result: {},
      success: true
    })
  })
)

router.get(
  '/:candidateId/interviews',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const candidate = await Candidate.findById(req.params.candidateId)
    res.json({
      code: 200,
      result: candidate.interviews,
      success: true
    })
  })
)

router.put(
  '/:candidateId/interviews',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Interview Edited Sucessfully'
    let interviewId = req.params.interview_id
    let reqSections = data.sections
    let overallScore = data.overall_score
    let genNotes = data.general_notes

    if (interviewId === undefined) {
      response = 'Invalid Edit Interview request'
    } else if (reqSections !== undefined) {
      Interview.findOneAndUpdate(
        { _id: new mongodb.ObjectId(interviewId) },
        { $set: { sections: reqSections } },
        { new: true }
      )
    } else if (overallScore !== undefined) {
      Interview.findOneAndUpdate(
        { _id: new mongodb.ObjectId(interviewId) },
        { $set: { overall_score: overallScore } },
        { new: true }
      )
    } else if (genNotes !== undefined) {
      Interview.findOneAndUpdate(
        { _id: new mongodb.ObjectId(interviewId) },
        { $set: { general_notes: genNotes } },
        { new: true }
      )
    }
    res.json({
      code: 200,
      message: response,
      result: {},
      success: true
    })
  })
)
router.delete(
  '/:candidateId/interviews/:interviewId',
  [leadsOnly],
  errorWrap(async (req, res) => {
    let response = 'Interview Deleted Sucessfully'
    const candidate = await Candidate.findById(req.params.candidateId)
    await candidate.interviews.id(req.params.interviewId).remove()
    await candidate.save() // save cascades down to subdocument
    res.json({
      code: 200,
      message: response,
      result: {},
      success: true
    })
  })
)

router.post(
  '/:candidateId/referrals',
  errorWrap(async (req, res) => {
    const candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, {
      $pull: { referrals: req._key_name, strongReferrals: req._key_name }
    })
    const referrals = candidate.referrals
    if (referrals === undefined || referrals.indexOf(req._key_name) === -1) {
      const candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, {
        $push: { referrals: req._key_name }
      })
      const updatedCandidate = await Candidate.findById(req.params.candidateId)
      const updatedReferrals = [updatedCandidate.strongReferrals, updatedCandidate.referrals]
      res.json({
        result: updatedReferrals,
        message: `Successfully referred user ${candidate._id}`,
        status: 200,
        success: true
      })
    } else {
      res.json({
        result: referrals,
        message: `Already referred user`,
        status: 400,
        success: false
      })
    }
  })
)
router.post(
  '/:candidateId/strongReferrals',
  errorWrap(async (req, res) => {
    const candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, {
      $pull: { referrals: req._key_name, strongReferrals: req._key_name }
    })
    const strongReferrals = candidate.strongReferrals
    if (strongReferrals === undefined || strongReferrals.indexOf(req._key_name) === -1) {
      const candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, {
        $push: { strongReferrals: req._key_name }
      })
      const updatedCandidate = await Candidate.findById(req.params.candidateId)
      const updatedReferrals = [updatedCandidate.strongReferrals, updatedCandidate.referrals]
      res.json({
        result: updatedReferrals,
        message: `Successfully strongly referred user ${candidate._id}`,
        status: 200,
        success: true
      })
    } else {
      res.json({
        result: strongReferrals,
        message: `Already referred user`,
        status: 400,
        success: false
      })
    }
  })
)
router.delete(
  '/:candidateId/referrals',
  errorWrap(async (req, res) => {
    const candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, {
      $pull: { referrals: req._key_name, strongReferrals: req._key_name }
    })
    const updatedCandidate = await Candidate.findById(req.params.candidateId)
    const updatedReferrals = [updatedCandidate.strongReferrals, updatedCandidate.referrals]
    res.json({
      result: updatedReferrals,
      message: `Successfully deleted referral for user ${candidate._id}`,
      status: 200,
      success: true
    })
  })
)

module.exports = router
