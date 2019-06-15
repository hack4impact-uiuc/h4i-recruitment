const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Event } = require('../models')

// get all events
router.get(
  '/',
  errorWrap(async (req, res) => {
    let events = await Event.find()
    res.json({ 
      code: 200,
      message: '',
      result: events,
      success: true })
  })
)

// get one event
router.get(
  '/:event_id',
  errorWrap(async (req, res) => {
    const event = await Event.findById(req.params.event_id)
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
    let response = 'Event Created Successfully'
    let code = 404
    let success = false
    let eventName = data.name
    let eventDate = data.date
    let eventStartTime = data.startTime
    let eventEndTime = data.endTime
    let eventLocation = data.location
    let eventDescription = data.description

    if (eventName == undefined) {
      response = 'Invalid Event Name'
    } else if (eventDate == undefined) {
      response = 'Invalid Event Date'
    } else if (eventStartTime == undefined) {
      response = 'Invalid Start Time'
    } else if (eventEndTime == undefined) {
      response = 'Invalid End Time'
    } else if (eventLocation == undefined) {
      response = 'Invalid Location'
    } else if (eventDescription == undefined) {
      response = 'Invalid Description'
    } else {
      const newEvent = new Event({
        name: eventName,
        date: eventDate,
        startTime: eventStartTime,
        endTime: eventEndTime,
        location: eventLocation,
        description: eventDescription,
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

// update an event
router.put(
  '/:event_id',
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Event Edited Sucessfully'
    let eventId = req.params.event_id
    let newName = data.name
    let newDate = data.date
    let newStartTime = data.startTime
    let newEndTime = data.endTime
    let newLocation = data.location
    let newDescription = data.description

    if (eventId == undefined) {
      response = 'Invalid Edit Event Request'
    } else {
      if (newName != undefined) {
        Event.findOneAndUpdate(
          { _id: new mongodb.ObjectId(eventId) },
          { $set: { name: newName } },
          { new: true },
          function(err, doc) {}
        )
      }
      if (newDate != undefined) {
        Event.findOneAndUpdate(
          { _id: new mongodb.ObjectId(eventId) },
          { $set: { date: newDate } },
          { new: true },
          function(err, doc) {}
        )
      } 
      if (newStartTime != undefined) {
        Event.findOneAndUpdate(
          { _id: new mongodb.ObjectId(eventId) },
          { $set: { startTime: newStartTime } },
          { new: true },
          function(err, doc) {}
        )
      }
      if (newEndTime != undefined) {
        Event.findOneAndUpdate(
          { _id: new mongodb.ObjectId(eventId) },
          { $set: { endTime: newEndTime } },
          { new: true },
          function(err, doc) {}
        )
      }
      if (newLocation != undefined) {
        Event.findOneAndUpdate(
          { _id: new mongodb.ObjectId(eventId) },
          { $set: { location: newLocation } },
          { new: true },
          function(err, doc) {}
        )
      }
      if (newDescription != undefined) {
        Event.findOneAndUpdate(
          { _id: new mongodb.ObjectId(eventId) },
          { $set: { description: newDescription } },
          { new: true },
          function(err, doc) {}
        )
      }
    }
    res.json({
      code: 200,
      message: response,
      result: {},
      success: true
    })
  })
)

// delete an event
router.delete(
  '/:event_id',
  errorWrap(async (req, res) => {
    let response = 'Event Deleted Sucessfully'
    let id = req.params.event_id
    const event = await Event.findById(id)
    if (event === undefined) {
      response = 'Invalid Delete Event request'
    } else {
      await Event.deleteOne({ _id: new mongodb.ObjectId(id) })
    }
    res.json({
      code: 200,
      message: response,
      result: {},
      success: true
    })
  })
)

// delete all events
router.delete(
  '/',
  errorWrap(async (req, res) => {
    let response = 'Events Deleted Sucessfully'
    await Event.deleteMany({})
    res.json({
      code: 200,
      message: response,
      result: {},
      success: true
    })
  })
)

module.exports = router

