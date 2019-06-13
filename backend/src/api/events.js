const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Event } = require('../models')

// getting all events
router.get(
  '/',
  errorWrap(async (req, res) => {
    let events = await Event.find()
    res.json({ result: events })
  })
)

// creating a new event
router.post(
  '/',
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Event Created Successfully'
    let code = 404
    let success = false
    let eventName = data.name
    let eventDate = data.date
    let eventStartTime = data.startTime
    let eventEndTime = data.endTime

    if (eventName == undefined) {
      response = 'Invalid Event Name'
    } else if (eventDate == undefined) {
      response = 'Invalid Event Date'
    } else if (eventStartTime == undefined) {
      response = 'Invalid Start Time'
    } else if (eventEndTime == undefined) {
      response = 'Invalid End Time'
    } else {
      const newEvent = new Event({
        name: eventName,
        date: eventDate,
        startTime: eventStartTime,
        endTime: eventEndTime,
        attendees: []
      });
      await newEvent.save()
      code = 200
      success = true
    }
    res.json({
      code,
      message: response,
      result: {},
      success
    })
  })
)

module.exports = router

