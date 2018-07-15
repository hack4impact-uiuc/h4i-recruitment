const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Candidate } = require('../models')

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
  '/initialize-status',
  errorWrap(async (req, res) => {
    await Candidate.update({}, { status: 'pending' }, { multi: true }, err => {
      if (err) {
        console.log(err.message)
      }
    })
    res.send('Set all status to pending')
  })
)

router.get(
  '/initialize-year',
  errorWrap(async (req, res) => {
    const candidates = await Candidate.find()
    const years = ['freshman', 'sophomore', 'junior', 'senior']
    candidates.map(async candidate => {
      let idx = Math.floor(Math.random() * 4); 
      await Candidate.findByIdAndUpdate(candidate._id, { year: years[idx] })
    })
    res.send("Initialize Years")
  })
)

router.get(
  '/initialize-role',
  errorWrap(async (req, res) => {
    const candidates = await Candidate.find()
    const roles = ['software engineer', 'product manager', 'tech lead', 'community director']
    candidates.map(async candidate => {
      let idx = Math.floor(Math.random() * 4); 
      await Candidate.findByIdAndUpdate(candidate._id, { role: roles[idx] })
    })
    res.send("Initialized Roles")
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

router.get(
  '/:candidateId',
  errorWrap(async (req, res) => {
    const candidate = await Candidate.findById(req.params.candidateId)
    res.json({ result: candidate })
  })
)

module.exports = router
