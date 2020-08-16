const { User } = require('../models')

// middleware around router
// checks whether key passed in through the query parameters
// are one of the keys listed in the json file.
// Passes name, key, is a lead boolean to the request object with the attributes: _key_name, _key, _is_lead
const validateRequest = async (req, res, next) => {
  // removed && key.length === 11
  // Can add this rule if wanted

  // check to see if URL is for register, since the key would not be recorded yet
  if (req.method === 'POST' && req.url.includes('/user/')) {
    return next()
  } else if (req.user) {
    populateAuthFieldsForReq(req)
    return next()
  }

  // if not authenticated
  res.status(403).json({
    code: 403,
    message: 'Bad Key',
    success: false
  })
}

const populateAuthFieldsForReq = req => {
  // Ported for backward compatibility with key-based auth
  req._key_name = req.user.firstName // set the user's name of the key that was used to make the request
  req._key = req.user.userId
  // check whether key is a director's, lead's, or member's key
  // this is used by the directorsOnly and membersOnly middleware
  if (req.user.role === 'Director') {
    req._is_director = true
    req._is_lead = true
    req._is_member = true
  } else if (req.user.role === 'Lead') {
    req._is_director = false
    req._is_lead = true
    req._is_member = true
  } else if (req.user.role === 'Member') {
    req._is_director = false
    req._is_lead = false
    req._is_member = true
  } else {
    req._is_director = false
    req._is_lead = false
    req._is_member = false
  }
}

module.exports = { validateRequest, populateAuthFieldsForReq }
