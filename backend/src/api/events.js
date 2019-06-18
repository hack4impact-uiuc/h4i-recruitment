const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Event } = require('../models')

// get all events
router.get(
  '/',
  errorWrap(async (req, res) => {
    const events = await Event.find()
    res.json({
      code: 200,
      message: '',
      result: events,
      success: true
    })
  })
)

// get one event
router.get(
  '/:event_id',
  errorWrap(async (req, res) => {
    const eventId = req.params.event_id
    const event = await Event.findById(eventId)
    res.json({
      code: 200,
      message: '',
      result: event,
      success: true
    })
  })
)

// create a new event
router.post(
  '/',
  errorWrap(async (req, res) => {
    const data = req.body
    const newEvent = new Event({
      name: data.name,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      description: data.description,
      attendees: []
    })
    await newEvent.save()
    res.json({
      code: 200,
      message: 'Event Successfully Created',
      success: true
    })
  })
)

// update an event
router.put(
  '/:event_id',
  errorWrap(async (req, res) => {
    const data = req.body
    const eventId = req.params.event_id
    let fieldsToUpdate = {}

    if (data.name !== undefined) {
      fieldsToUpdate['name'] = data.name
    }
    if (data.date !== undefined) {
      fieldsToUpdate['date'] = data.date
    }
    if (data.startTime !== undefined) {
      fieldsToUpdate['startTime'] = data.startTime
    }
    if (data.endTime !== undefined) {
      fieldsToUpdate['endTime'] = data.endTime
    }
    if (data.location !== undefined) {
      fieldsToUpdate['location'] = data.location
    }
    if (data.description !== undefined) {
      fieldsToUpdate['description'] = data.description
    }

    Event.findOneAndUpdate(
      { _id: new mongodb.ObjectId(eventId) },
      { $set: fieldsToUpdate },
      { new: true },
      function(err, doc) {}
    )

    res.json({
      code: 200,
      message: 'Event Successfully Updated',
      result: {},
      success: true
    })
  })
)

// delete an event
router.delete(
  '/:event_id',
  errorWrap(async (req, res) => {
    const eventId = req.params.event_id
    await Event.deleteOne({ _id: new mongodb.ObjectId(eventId) })
    res.json({
      code: 200,
      message: 'Event Deleted Successfully',
      success: true
    })
  })
)

// delete all events
router.delete(
  '/',
  errorWrap(async (req, res) => {
    await Event.deleteMany({})
    res.json({
      code: 200,
      message: 'Events Deleted Successfully',
      success: true
    })
  })
)

module.exports = router
