const { assert } = require('chai')
const sinon = require('sinon')
const authMiddleware = require('../src/middleware/auth')
const { KEY, getAuthMiddlewareRequestStub } = require('./utils')

const json = () => {
  return 'WOO'
}
const status = code => {
  return { json }
}
let res = { status, json }

describe('Auth middleware', () => {
  it('should not call next() when the key is a substring of the real key', async () => {
    let req = getAuthMiddlewareRequestStub('hjsdhfy79')
    let nextSpy = sinon.spy()
    authMiddleware(req, res, nextSpy)
    assert(nextSpy.notCalled)
  })

  it('should not call next() when the key contains a substring that is the real key', async () => {
    let req = getAuthMiddlewareRequestStub('hjsdhfy79uutt')
    let nextSpy = sinon.spy()
    authMiddleware(req, res, nextSpy)
    assert(nextSpy.notCalled)
  })
  it('sshould call next() when the key matches a key in the db', async () => {
    let req = getAuthMiddlewareRequestStub(KEY)
    let nextSpy = sinon.spy()
    authMiddleware(req, res, nextSpy)
    assert(nextSpy.calledOnce)
  })
  it('should not call next() when the key is the same length as keys in db but is not in the db', async () => {
    let req = getAuthMiddlewareRequestStub('hjsdhfy79ud')
    let nextSpy = sinon.spy()
    authMiddleware(req, res, nextSpy)
    assert(nextSpy.notCalled)
  })
})
