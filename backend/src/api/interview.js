const express = require('express')
const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
const keyData = require(keyPath)
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Interview } = require('../models')
var mongodb = require('mongodb')

router.get(
  '/verify_interviewer/:key',
  errorWrap(async (req, res) => {
    let keyVerified = false
    if (req.params.key && req.params.key.length === 11) {
      keyVerified = keyData.keys.filter(currKey => currKey.key === req.params.key).length !== 0
    }
    let statusCode = keyVerified ? 200 : 400
    let message = keyVerified ? 'key is verified' : 'key did not pass verification'
    res.status(statusCode).json({
      code: statusCode,
      message: message,
      success: keyVerified
    })
  })
)

router.get(
  '/',
  errorWrap(async (req, res) => {
    let interviews
    interviews = await Interview.find()
    res.json({
      code: 200,
      message: '',
      result: { interviews },
      success: true
    })
  })
)

router.get(
  '/:interview_id',
  errorWrap(async (req, res) => {
    const retInterview = await Interview.findById(req.params.interview_id)
    res.json({
      code: 200,
      message: '',
      result: { retInterview },
      success: true
    })
  })
)

router.get(
  '/past-interviews/:interviewer_key',
  errorWrap(async (req, res) => {
    const interviews = await Interview.find()
    console.log(interviews)
    const retInterviews = interviews.filter(interview => interview.interviewer_key === req.params.interviewer_key)
    let statusCode = retInterviews ? 200 : 400;

    res.status(statusCode).json({
      code: statusCode,
      message: '',
      result: retInterviews ,
      success: true
    })
  })
)

router.post(
  '/',
  errorWrap(async (req, res) => {
    data = req.body
    let response = 'Interview Added Sucessfully'
    let interviewerKey = data.interviewer_key
    let reqSections = data.sections
    let candidateId = data.candidate_id
    let score = data.overall_score
    let genNotes = data.general_notes

    if (interviewerKey == undefined) {
      response = 'Invalid interviewerKey'
    } else if (candidateId == undefined) {
      response = 'Invalid candidateId'
    } else if (reqSections == undefined) {
      response = 'Invalid sections'
    } else if (score == undefined) {
      response = 'Invalid score'
    } else if (genNotes == undefined) {
      response = 'Invalid notes'
    } else {
      //await Candidate.findByIdAndUpdate(candidateId, { status: 'interviewing' })
      const interview = new Interview({
        interviewer_key: interviewerKey,
        overall_score: score,
        candidate_id: candidateId,
        general_notes: genNotes,
        sections: reqSections
      })
      await interview.save()
      //await Candidate.findByIdAndUpdate(candidateId, { interview: interview})
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
  '/:interview_id',
  errorWrap(async (req, res) => {
    let response = 'Interview Deleted Sucessfully'
    let id = req.params.interview_id
    const retInterview = await Interview.findById(id)
    if (retInterview == undefined) {
      response = 'Invalid Delete Interview request'
    } else {
      Interview.deleteOne({ _id: new mongodb.ObjectId(id) }, function(err, results) {})
    }
    res.json({
      code: 200,
      message: response,
      result: {},
      success: true
    })

    // Interview.deleteOne({ _id: new mongodb.ObjectId(id) }, (err, result) => {
    //   if (err)
    //     response = 'Invalid Delete'
    //   res.json({ result: response })
    // })
  })
)

router.put(
  '/:interview_id',
  errorWrap(async (req, res) => {
    data = req.body
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

module.exports = router
