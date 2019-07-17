const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Attendee, Candidate } = require('../models')

// get all attendees
router.get(
  '/',
  errorWrap(async (req, res) => {
    const attendees = await Attendee.find({})
    res.json({
      code: 200,
      result: attendees,
      success: true
    })
  })
)

// get one attendee
router.get(
  '/:attendeeId',
  errorWrap(async (req, res) => {
    const attendeeId = req.params.attendeeId
    const attendee = await Attendee.findById(attendeeId)
    res.json({
      code: 200,
      result: attendee,
      success: true
    })
  })
)

// create a new attendee
router.post(
  '/',
  errorWrap(async (req, res) => {
    const data = req.body
    const candidate = await Candidate.findOne({email: data.email})
    const isCandidate = candidate ? true : false
    const newAttendee = new Attendee({
      name: data.name,
      email: data.email,
      year: data.year,
      isCandidate
    })

    await newAttendee.save()
    res.json({
      code: 200,
      message: 'Attendee Successfully Created',
      success: true
    })
  })
)

// update an attendee
router.put(
  '/:attendeeId',
  errorWrap(async (req, res) => {
    const data = req.body
    const attendeeId = req.params.attendeeId
    let fieldsToUpdate = {}

    if (data.name !== undefined) {
      fieldsToUpdate['name'] = data.name
    }
    if (data.email !== undefined) {
      fieldsToUpdate['email'] = data.email
    }
    if (data.year !== undefined) {
      fieldsToUpdate['year'] = data.year
    }

    const attendee = await Attendee.findByIdAndUpdate(
      attendeeId,
      { $set: fieldsToUpdate },
      { new: true }
    )
    const ret = attendee
      ? {
          code: 200,
          message: 'Attendee Updated Successfully',
          success: true
        }
      : {
          code: 404,
          message: 'Attendee Not Found',
          success: false
        }
    res.json(ret)
  })
)

// delete an attendee
router.delete(
  '/:attendeeId',
  errorWrap(async (req, res) => {
    const attendeeId = req.params.attendeeId
    const attendee = await Attendee.findByIdAndRemove(attendeeId)
    const ret = attendee
      ? {
          code: 200,
          message: 'Attendee Deleted Successfully',
          success: true
        }
      : {
          code: 404,
          message: 'Attendee Not Found',
          success: false
        }
    res.json(ret)
  })
)

// delete all events
router.delete(
  '/',
  errorWrap(async (req, res) => {
    await Attendee.deleteMany({})
    res.json({
      code: 200,
      message: 'Attendees Deleted Successfully',
      success: true
    })
  })
)

module.exports = router
