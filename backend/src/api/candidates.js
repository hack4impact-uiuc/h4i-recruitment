const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Candidate } = require('../models')
const { getGithubContributions } = require('../utils/gitScraper')

router.get(
  '/',
  errorWrap(async (req, res) => {
    let candidates
    if (req.query.status) {
      if (req.query.status == 'everyone') {
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

// TODO: Fix
router.post(
  '/',
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
  '/:candidateId',
  errorWrap(async (req, res) => {
    const candidate = await Candidate.findById(req.params.candidateId)
    res.json({ result: candidate })
  })
)

router.post(
  '/set-status',
  errorWrap(async (req, res) => {
    data = req.body
    let response = 'Status set Sucessfully'
    switch (data.status) {
      case 'pending':
        await Candidate.findByIdAndUpdate(data.id, { status: 'pending' })
        break
      case 'accepted':
        await Candidate.findByIdAndUpdate(data.id, { status: 'accepted' })
        break
      case 'interviewing':
        await Candidate.findByIdAndUpdate(data.id, { status: 'interviewing' })
        break
      case 'rejected':
        await Candidate.findByIdAndUpdate(data.id, { status: 'rejected' })
        break
      default:
        response = 'Invalid status, please try again'
    }
    res.json({ result: response })
  })
)

module.exports = router
