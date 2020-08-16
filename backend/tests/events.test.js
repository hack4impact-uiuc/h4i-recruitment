const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')
const { Event } = require('../src/models')
const { KEY } = require('./utils.js')
const { stubAuthUser } = require('./utils')
require('./mongo_utils')

beforeEach(async () => {
  await Event.deleteMany()
})

describe('GET /events', () => {
  it('should get all events', async () => {
    stubAuthUser()
    const res = await request(app)
      .get(`/api/events?key=${KEY}`)
      .expect(200)
    expect(res.body.result).to.be.an('array')
  })
})

describe('GET /events/:eventId', () => {
  it('should get all events', async () => {
    stubAuthUser()
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
      .get(`/api/events/${event._id}?key=${KEY}`)
      .expect(200)
    expect(res.body.result.name).to.eq('Alices Event')
  })
})

describe('POST /events/:eventId', () => {
  it('creates one event', async () => {
    stubAuthUser()
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
      .post(`/api/events?key=${KEY}`)
      .send(event)
      .expect(200)
  })
})

describe('PUT /events', () => {
  it('should edit an event', async () => {
    stubAuthUser()
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

    const bodyParams = {
      description: 'its not lit'
    }
    await request(app)
      .put(`/api/events/${event._id}?key=${KEY}`)
      .send(bodyParams)
      .expect(200)

    const changedEvent = await Event.findById(event._id)
    expect(changedEvent.description).to.eq('its not lit')
  })
})

describe('DELETE /events', () => {
  it('delete an event', async () => {
    stubAuthUser()
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
      .delete(`/api/events/${event._id}/?key=${KEY}`)
      .expect(200)
    const deletedEvent = await Event.findById(event._id)
    expect(deletedEvent).to.be.null
  })
})
