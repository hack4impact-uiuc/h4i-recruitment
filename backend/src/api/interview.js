const express = require('express')
var mongodb = require('mongodb')
const { errorWrap, leadsOnly } = require('../middleware')
const { Interview, Candidate } = require('../models')
const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
const keyData = require(keyPath)
const { statusEnum } = require('../utils/enums')

const router = express.Router()

router.get(
  '/verify_interviewer',
  errorWrap(async (req, res) => {
    let keyVerified = false
    const key = req.query.key
    // removed && key.length === 11)
    if (key) {
      keyVerified = keyData.keys.filter(currKey => currKey.key === key).length !== 0
    }
    let statusCode = keyVerified ? 200 : 403
    let message = keyVerified ? 'key is verified' : 'key did not pass verification'
    res.status(statusCode).json({
      code: statusCode,
      message: message,
      success: keyVerified,
      result: { name: req._key_name, is_lead: req._is_lead }
    })
  })
)
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
  '/interviewer/:interviewer_key',
  errorWrap(async (req, res) => {
    let interviews = []
    const candidates = await Candidate.find()
    for (var idx = 0; idx < candidates.length; idx++) {
      if (candidates[idx].interviews.length !== 0) {
        const filtered = candidates[idx].interviews.filter(
          interview => interview.interviewer_key === req.params.interviewer_key
        )
        interviews.push(...filtered)
      }
    }
    let statusCode = interviews ? 200 : 400

    res.status(statusCode).json({
      code: statusCode,
      message: '',
      result: interviews,
      success: true
    })
  })
)

module.exports = router
