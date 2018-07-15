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
  


module.exports = router
