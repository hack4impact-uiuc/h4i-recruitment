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
      let interviewerIds = data.interviewers;
      let candidateId = data.candidateId;
      let reqSections = data.sections;

      if (interviewerIds == undefined | interviewerIds == undefined | interviewerIds == undefined) {
        response = 'Invalid request'
      }
      else {
        await Candidate.findByIdAndUpdate(candidateId, { status: 'interviewing' })
        const interview = new Interview({
            interviewers: interviewerIds,
            candidate: candidateId,
            sections: reqSections
        })
        await interview.save()
      }
      res.json({ result: response })
    })
  )


module.exports = router
