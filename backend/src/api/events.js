const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Attendee, Event } = require('../models')
const { attendeeIsLate } = require('../utils/utils.js')

// get all events
router.get(
  '/',
  errorWrap(async (req, res) => {
    const events = await Event.find()
    res.json({
      code: 200,
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
      fbLink: data.fbLink
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
    if (data.fbLink !== undefined) {
      fieldsToUpdate['fbLink'] = data.fbLink
    }
    const event = await Event.findByIdAndUpdate(eventId, { $set: fieldsToUpdate }, { new: true })
    const ret = event
      ? {
          code: 200,
          message: 'Event Updated Successfully',
          success: true
        }
      : {
          code: 404,
          message: 'Event Not Found',
          success: false
        }
    res.json(ret)
  })
)

// check in to an event
router.put(
  '/:eventId/attendees',
  errorWrap(async (req, res) => {
    const data = req.body
    const eventId = req.params.eventId
    const attendeeEmail = data.email
    
    const event = await Event.findById(eventId)
    if (event) {
      let attendee = await Attendee.findOne({email: attendeeEmail})

      // create new attendee if not in db
      if (!attendee) {
        const newAttendee = new Attendee({
          name: data.name,
          email: attendeeEmail,
          year: data.year
        })
        await newAttendee.save()
        attendee = newAttendee
      }

      // prevent duplicate check-ins
      if (event.attendees.includes(attendeeEmail)) {
        res.json({
          code: 200,
          message: 'Already Checked In',
          success: true
        })
      }
      
      // update event attendees and attendee events
      event.attendees.push(attendeeEmail)
      attendee.attendedEvents.push(eventId)

      // handle tardiness
      if (attendeeIsLate(event)) {
        event.lateAttendees.push(attendeeEmail)
        attendee.lateEvents.push(eventId)
      }

      await event.save()
      await attendee.save()

      res.json({
        code: 200,
        message: "Successfully Checked In",
        success: true,
      })
    } else {
      res.json({
        code: 404,
        message: 'Event Not Found',
        success: false
      })
    }
  })
)

// delete an event
router.delete(
  '/:event_id',
  errorWrap(async (req, res) => {
    const eventId = req.params.event_id
    const event = await Event.findByIdAndRemove(eventId)
    const ret = event
      ? {
          code: 200,
          message: 'Event Deleted Successfully',
          success: true
        }
      : {
          code: 404,
          message: 'Event Not Found',
          success: false
        }
    res.json(ret)
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
