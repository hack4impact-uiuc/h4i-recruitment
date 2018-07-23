const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Interview } = require('../models')

router.get(
    '/verified-interviewer',
    errorWrap(async (req, res) => {
        // const foundKey = await Interview.findById(req.params.interviewerKey);
        
        // res.json({ result: foundKey })
        /*** NOT IMPLEMENTED */
    })
)

router.get(
    '/interview',
    errorWrap(async (req, res) => {
        const retInterview = await Interview.findById(req.params.interviewerKey);
        res.json({ interview: retInterview })
    })
)

router.post(
    '/add-interview',
    errorWrap(async (req, res) => {
      data = req.body
      let response = 'Interview Added Sucessfully'
      let interviewerKey = data.interviewerKey;
      let reqSections = data.sections;
      let candidateId = data.candidateId;
      let score = data.overallScore;

      if (interviewerKey == undefined | candidateId == undefined | reqSections == undefined | score == undefined) {
        response = 'Invalid Add Interview request'
      }
      else {
        await Candidate.findByIdAndUpdate(candidateId, { status: 'interviewing' })
        const interview = new Interview({
            interviewerKey: interviewerKey,
            sections: reqSections,
            overallScore: score,
            candidateId: candidateId
        })
        await interview.save()
        await Candidate.findByIdAndUpdate(candidateId, { interview: interview})
      }
      res.json({ result: response })
    })
  )

  router.delete(
    '/delete-interview',
    errorWrap(async (req, res) => {
      data = req.body
      let response = 'Interview Deleted Sucessfully'
      let interviewId = data.id

      if (interviewId == undefined) {
        response = 'Invalid Delete Interview request'
      }
      else {
        Interview.remove({ id: interviewId })
      }
      res.json({ result: response })
    })
  )

router.put(
    '/edit-interview',
    errorWrap(async (req, res) => {
      data = req.body
      let response = 'Interview Edited Sucessfully'
      let interviewId = data.id
      let reqSections = data.sections
      if (interviewId == undefined) {
        response = 'Invalid Edit Interview request'
      }
      else {
        Interview.findByIdAndUpdate( interviewId, { sections: reqSections })
      }
      res.json({ result: response })
    })
  )

module.exports = router
