const { assert } = require('chai')
const sinon = require('sinon')
const { validateRequest } = require('../src/middleware/auth') // must be imported directly
const leadsOnly = require('../src/middleware/leadsOnly')
require('./mongo_utils')

const json = () => {
  return 'WOO'
}
const status = code => {
  return { json }
}
let res = { status, json }

describe('Auth middleware', () => {
  it('should not call next() when no user is found', async () => {
    const nextSpy = sinon.spy()
    await validateRequest({}, res, nextSpy)
    assert(nextSpy.notCalled)
  })
  it('should call next() when a user is found', async () => {
    const nextSpy = sinon.spy()
    await validateRequest({ user: { role: 'Director' } }, res, nextSpy)
    assert(nextSpy.calledOnce)
  })
})

describe('onlyLeads middleware', () => {
  it('should call next() when key has lead role', async () => {
    let nextSpy = sinon.spy()
    leadsOnly({ _is_lead: true }, res, nextSpy)
    assert(nextSpy.calledOnce)
  })

  it('should not call next() when key does NOT have lead role', async () => {
    let nextSpy = sinon.spy()
    leadsOnly({ _is_member: true }, res, nextSpy)
    assert(nextSpy.notCalled)
  })
})
