const mongoose = require('mongoose')
const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { Event } = require('../src/models')
const { KEY } = require('./utils.js')
require('./mongo_utils')

beforeEach(async () => {
  await Event.deleteMany()
})

describe('App can run', done => {
  it('returns status 200', async () => {
    const res = await request(app)
      .get(`/?key=${KEY}`)
      .expect(200)
  })
})

describe('GET /events', () => {
  it('should get all events', async () => {
    const res = await request(app)
      .get(`/events?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.be.an('array')
  })
})

describe('GET /events/:eventId', () => {
  it('should get all events', async () => {
    const event = new Event({
      name: 'Alices Event',
      date: '2019-06-30',
      startTime: '17:30',
      endTime: '19:30',
      location: 'ECEB',
      description: 'it lit',
      attendees: [],
      fbLink: 'link'
    })
    await event.save()
    const res = await request(app)
      .get(`/events/${event._id}?key=${KEY}`)
      .expect(200)
    expect(res.body.result.name).to.eq('Alices Event')
  })
})

describe('POST /events/:eventId', () => {
  it('creates one event', async () => {
    const event = new Event({
      name: 'Alices Event',
      date: '2019-06-30',
      startTime: '17:30',
      endTime: '19:30',
      location: 'ECEB',
      description: 'it lit',
      attendees: [],
      fbLink: 'link'
    })

    await request(app)
      .post(`/events?key=${KEY}`)
      .send(event)
      .expect(200)
  })
})

describe('PUT /events', () => {
  it('should edit an event', async () => {
    let event = new Event({
      name: 'Alices Event',
      date: '2019-06-30',
      startTime: '17:30',
      endTime: '19:30',
      location: 'ECEB',
      description: 'it lit',
      attendees: [],
      fbLink: 'link'
    })
    await event.save()

    body_params = {
      description: 'its not lit'
    }
    await request(app)
      .put(`/events/${event._id}?key=${KEY}`)
      .send(body_params)
      .expect(200)

    const changedEvent = await Event.findById(event._id)
    expect(changedEvent.description).to.eq('its not lit')
  })
})

describe('DELETE /events', () => {
  it('delete an event', async () => {
    let event = new Event({
      name: 'Alices Event',
      date: '2019-06-30',
      startTime: '17:30',
      endTime: '19:30',
      location: 'ECEB',
      description: 'it lit',
      attendees: [],
      fbLink: 'link'
    })
    await event.save()

    await request(app)
      .delete(`/events/${event._id}/?key=${KEY}`)
      .expect(200)
    const deletedEvent = await Event.findById(event._id)
    expect(deletedEvent).to.be.null
  })
})
