const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Attendee, Candidate, Event } = require('../models')
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

// get event attendees
router.get(
  '/:event_id/attendees',
  errorWrap(async (req, res) => {
    const eventId = req.params.event_id
    const event = await Event.findById(eventId)
    if (!event) {
      res.json({
        code: 404,
        message: "Invalid Event",
        success: false
      })
    }
    let attendees = []
    for (email of event.attendeeEmails) {
      const attendee = await Attendee.findOne({email})
      if (attendee) {
        attendees.push(attendee)
      }
    }

    res.json({
      code: 200,
      message: "Attendees Retrieved Successfully",
      result: attendees,
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

    const event = await Event.findById(eventId)

    if (!event) {
      res.json({
        code: 404,
        message: 'Event Not Found',
        success: false
      })
    } else {
      let attendee = await Attendee.findOne({ email: data.email })

      // create new attendee if not in db
      if (!attendee) {
        const candidate = await Candidate.findOne({email: data.email})
        const isCandidate = candidate ? true : false
        
        attendee = new Attendee({
          name: data.name,
          email: data.email,
          year: data.year,
          isCandidate
        })
        await attendee.save()
      }

      // prevent duplicate check-ins
      if (event.attendeeEmails.includes(data.email)) {
        res.json({
          code: 200,
          message: 'Already Checked In',
          success: true
        })
      }

      // update event attendees and attendee events
      event.attendeeEmails.push(data.email)
      attendee.attendedEvents.push(eventId)

      // handle tardiness
      if (attendeeIsLate(event)) {
        event.lateAttendeeEmails.push(data.email)
        attendee.lateEvents.push(eventId)
      }

      await event.save()
      await attendee.save()

      res.json({
        code: 200,
        message: 'Successfully Checked In',
        success: true
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
