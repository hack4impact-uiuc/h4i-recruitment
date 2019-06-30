const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')
const { errorWrap, leadsOnly, directorsOnly } = require('../middleware')
const { Candidate, Comment, Interview } = require('../models')
const {
  statusEnum,
  referralEnum,
  yearsEnum,
  rolesEnum,
  gradEnum,
  enumToArray
} = require('../utils/enums')
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
      .map(x => x.replace('Referral', 'referral'))
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
      .map(x => x.replace('Strong Referrals', 'strongReferrals'))
      .map(x => x.replace('Referrals', 'referrals'))
      .map(x => x.replace('Facemash Score', 'facemashRankings.elo'))
      .map(x => x.replace('Number of Matches', 'facemashRankings.numOfMatches'))

    Array.from(renamedSelects).forEach(x => (selectFilters[x] = 1))
    // add github to the query as well, althought it isn't
    // a selectable in the frontend
    selectFilters.github = 1
    let candidates = await Candidate.find()
      .select(selectFilters)
      .find({ status: filter.status })
      .find({ referralStatus: filter.referral })
      .find({ year: filter.year })
      .find({ graduationDate: filter.graduationDate })
      .find({ role: { $in: filter.roles } })
      .sort(sortFilters)
    res.json({ result: candidates })
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
    let round = data.round
    let scored = data.scored

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
        category: givenCategory,
        round: round,
        scored: scored
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
  '/:candidateId/interviews/:interviewId',
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Interview Edited Sucessfully'
    const interviewId = req.params.interviewId
    const reqSections = data.sections
    const overallScore = data.overall_score
    const genNotes = data.general_notes

    if (interviewId === undefined) {
      response = 'Interview ID not provided'
    } else {
      const candidate = Candidate.findById(req.params.candidateId)
      if (candidate) {
        let interview = candidate.interviews.id(interviewId)
        if (interview) {
          if ((interview.interviewer_key = req._key)) {
            if (reqSections !== undefined) {
              interview.sections = reqSections
            }
            if (overallScore !== undefined) {
              interview.overall_score = overallScore
            }
            if (genNotes !== undefined) {
              interview.general_notes = genNotes
            }
            Candidate.findByIdAndUpdate(interviewId, interview)
          } else {
            response = 'Not authorized'
          }
        } else {
          response = 'Interview not found'
        }
      } else {
        response = 'Candidate not found'
      }
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
  [directorsOnly],
  errorWrap(async (req, res) => {
    const response = 'Interview Deleted Sucessfully'
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
        $push: { referrals: req._key_name },
        referralStatus: referralEnum.REFERRAL
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
        $push: { strongReferrals: req._key_name },
        referralStatus: referralEnum.STRONG_REFERRAL
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
      $pull: { referrals: req._key_name, strongReferrals: req._key_name },
      referralStatus: referralEnum.NO_REFERRAL
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
