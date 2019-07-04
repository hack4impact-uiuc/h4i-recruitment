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
  '/:netId',
  errorWrap(async (req, res) => {
    const netId = req.params.netId
    const attendee = await Attendee.find({ netId })
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
    const newAttendee = new Attendee({
      name: data.name,
      netId: data.netId,
      email: data.netId + '@illinois.edu',
      year: data.year
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
  '/:netId',
  errorWrap(async (req, res) => {
    const data = req.body
    const netId = req.params.netId
    let fieldsToUpdate = {}

    if (data.name !== undefined) {
      fieldsToUpdate['name'] = data.name
    }
    if (data.netId !== undefined) {
      fieldsToUpdate['netId'] = data.netId
      fieldsToUpdate['email'] = data.netId + '@illinois.edu'
    }
    if (data.year !== undefined) {
      fieldsToUpdate['year'] = data.year
    }

    const attendee = await Attendee.findOneAndUpdate(
      { netId },
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
  '/:netId',
  errorWrap(async (req, res) => {
    const netId = req.params.netId
    const attendee = await Attendee.findOneAndRemove({ netId })
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
