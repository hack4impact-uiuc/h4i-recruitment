const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Candidate } = require('../models')
const { statusenum, yearsenum, rolesenum, gradenum, enumToArray } = require('../enums')

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

//Initialize endpoints generate dummy data for development purposes

router.get(
  '/initialize-status',
  errorWrap(async (req, res) => {
    await Candidate.update({}, { status: statusenum.PENDING }, { multi: true }, err => {
      if (err) {
        console.log(err.message)
      }
    })
    res.send('Set all status to Pending')
  })
)

router.get(
  '/initialize-year',
  errorWrap(async (req, res) => {
    const candidates = await Candidate.find()
    const years = enumToArray(yearsenum)
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
    const gradyears = enumToArray(gradenum)
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
    const roles = enumToArray(rolesenum)
    candidates.map(async candidate => {
      let idx = Math.floor(Math.random() * roles.length)
      await Candidate.findByIdAndUpdate(candidate._id, { role: roles[idx] })
    })
    res.send('Initialized Roles')
  })
)

router.post(
  '/set-status',
  errorWrap(async (req, res) => {
    data = req.body
    let response = 'Status set Sucessfully'
    switch (data.status) {
      case statusenum.PENDING:
        await Candidate.findByIdAndUpdate(data.id, { status: statusenum.PENDING })
        break
      case statusenum.ACCEPTED:
        await Candidate.findByIdAndUpdate(data.id, { status: statusenum.ACCEPTED })
        break
      case statusenum.INTERVIEWING:
        await Candidate.findByIdAndUpdate(data.id, { status: statusenum.INTERVIEWING })
        break
      case statusenum.DENIED:
        await Candidate.findByIdAndUpdate(data.id, { status: statusenum.DENIED })
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
