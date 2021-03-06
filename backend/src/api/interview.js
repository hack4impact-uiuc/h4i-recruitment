const express = require('express')
var mongodb = require('mongodb')
const { errorWrap, membersOnly } = require('../middleware')
const { Interview, Candidate } = require('../models')
const { statusEnum } = require('../utils/enums')
const { User } = require('../models')

const router = express.Router()

router.get('/verify_member', (req, res) => {
  let statusCode = req.user ? 200 : 403
  let message = req.user ? 'User is verified' : 'User did not pass verification'
  res.status(statusCode).json({
    code: statusCode,
    message: message,
    success: req.user !== undefined,
    result: {
      name: req.user ? req.user.firstName : undefined,
      role: req.user ? req.user.role : undefined,
      memberId: req.user ? req.user.memberId : undefined,
      email: req.user ? req.user.email : undefined
    }
  })
})
// useful route to get all interviews
router.get(
  '/',
  errorWrap(async (req, res) => {
    let candidates
    if (req.query.notRejected) {
      // finds candidates with a matching status in the array. gets interviews from candidates
      // that either have ACCEPTED, INTERVIEWING or DONE_INTERVIEW statuses
      candidates = await Candidate.find({
        status: {
          $in: [statusEnum.ACCEPTED, statusEnum.INTERVIEWING, statusEnum.DONE_INTERVIEWING]
        }
      })
    } else if (req.query.status) {
      // filters candidates with matching status
      candidates = await Candidate.find({ status: req.query.status })
    } else {
      candidates = await Candidate.find()
    }
    let interviews = []
    for (var idx = 0; idx < candidates.length; idx++) {
      if (candidates[idx].interviews.length !== 0) {
        interviews.push(...candidates[idx].interviews)
      }
    }

    res.json({
      code: 200,
      message: '',
      result: interviews,
      success: true
    })
  })
)

// get interviews based on interviewer
router.get(
  '/interviewer',
  errorWrap(async (req, res) => {
    const interviews = []
    const candidates = await Candidate.find()
    candidates.forEach(candidate => {
      if (candidate.interviews.length !== 0) {
        const filtered = candidate.interviews.filter(
          interview => interview.interviewer_key === req._key
        )
        interviews.push(...filtered)
      }
    })
    const statusCode = interviews ? 200 : 400

    res.status(statusCode).json({
      code: statusCode,
      message: '',
      result: interviews,
      success: true
    })
  })
)

// get interview based on id
router.get(
  '/:interview_id',
  errorWrap(async (req, res) => {
    const interviewID = req.params.interview_id
    const result = await Candidate.findOne({ 'interviews._id': interviewID })
    if (result === null) {
      res.status(400).json({
        code: 400,
        message: `Cannot find interview ${interviewID}`,
        success: false,
        result: null
      })
      return
    }
    const interview = result.interviews.find(interview => String(interview._id) === interviewID) // need to cast Mongo Object ID to string

    const ret = {
      candidateID: result._id,
      candidateName: result.name,
      interview: interview
    }

    res.json({
      code: 200,
      message: `Successfully found interview ${interviewID}`,
      success: true,
      result: ret
    })
  })
)

// BELOW ARE LEGACY ENDPOINTS - they still work but will be removed shortly
router.get(
  '/candidate-interviews/:candidate_id',
  errorWrap(async (req, res) => {
    const interviews = await Interview.find()
    const retInterviews = interviews.filter(
      interview => interview.candidate_id === req.params.candidate_id
    )
    let statusCode = retInterviews ? 200 : 400
    res.status(statusCode).json({
      code: statusCode,
      message: '',
      result: retInterviews,
      success: true
    })
  })
)

router.get(
  '/past-interviews',
  errorWrap(async (req, res) => {
    const interviews = await Interview.find()
    const retInterviews = interviews.filter(interview => interview.interviewer_key === req._key)

    let statusCode = retInterviews ? 200 : 400

    res.status(statusCode).json({
      code: statusCode,
      message: '',
      result: retInterviews,
      success: true
    })
  })
)

router.get(
  '/:interview_id',
  [membersOnly],
  errorWrap(async (req, res) => {
    const retInterview = await Interview.findById(req.params.interview_id)
    res.json({
      code: 200,
      message: '',
      result: retInterview,
      success: true
    })
  })
)

router.post(
  '/',
  [membersOnly],
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Interview Added Successfully'
    let code = 404
    let interviewerKey = data.interviewerKey
    let reqSections = data.sections
    let candidateId = data.candidateId
    let candidateName = data.candidateName
    let score = data.overallScore
    let genNotes = data.generalNotes
    let reqRound = data.round
    let reqScored = data.scored

    if (interviewerKey == undefined) {
      response = 'Invalid interviewerKey'
    } else if (candidateId == undefined) {
      response = 'Invalid candidateId'
    } else if (candidateName == undefined) {
      response = 'Invalid candidateName'
    } else if (reqSections == undefined) {
      response = 'Invalid sections'
    } else if (score == undefined) {
      response = 'Invalid score'
    } else if (genNotes == undefined) {
      response = 'Invalid notes'
    } else if (reqRound == undefined) {
      response = 'Invalid round'
    } else if (reqScored == undefined) {
      response = 'Invalid scored'
    } else {
      // await Candidate.findByIdAndUpdate(candidateId, { status: 'interviewing' })
      const interview = new Interview({
        interviewer_key: interviewerKey,
        interviewer_name: req._key_name,
        overall_score: score,
        candidate_id: candidateId,
        candidate_name: candidateName,
        general_notes: genNotes,
        sections: reqSections,
        round: reqRound,
        scored: reqScored
      })
      await interview.save()
      code = 200
      // await Candidate.findByIdAndUpdate(candidateId, { interview: interview})
    }
    res.json({
      code,
      message: response,
      result: {},
      success: true
    })
  })
)

router.put(
  '/:interview_id',
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Interview Edited Sucessfully'
    let interviewId = req.params.interview_id
    let reqSections = data.sections
    let overallScore = data.overall_score
    let genNotes = data.general_notes

    if (interviewId == undefined) {
      response = 'Invalid Edit Interview request'
    } else if (reqSections != undefined) {
      Interview.findOneAndUpdate(
        { _id: new mongodb.ObjectId(interviewId) },
        { $set: { sections: reqSections } },
        { new: true },
        function(err, doc) {}
      )
    } else if (overallScore != undefined) {
      Interview.findOneAndUpdate(
        { _id: new mongodb.ObjectId(interviewId) },
        { $set: { overall_score: overallScore } },
        { new: true },
        function(err, doc) {}
      )
    } else if (genNotes != undefined) {
      Interview.findOneAndUpdate(
        { _id: new mongodb.ObjectId(interviewId) },
        { $set: { general_notes: genNotes } },
        { new: true },
        function(err, doc) {}
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

// delete interview given interview id
router.delete(
  '/:interview_id',
  errorWrap(async (req, res) => {
    let response = 'Interview Deleted Sucessfully'
    let id = req.params.interview_id
    const retInterview = await Interview.findById(id)
    if (retInterview === undefined) {
      response = 'Invalid Delete Interview request'
    } else {
      await Interview.deleteOne({ _id: new mongodb.ObjectId(id) })
    }
    res.json({
      code: 200,
      message: response,
      result: {},
      success: true
    })
  })
)

module.exports = router
