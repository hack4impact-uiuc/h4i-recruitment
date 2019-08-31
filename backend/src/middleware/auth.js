const { User } = require('../models')

// middleware around router
// checks whether key passed in through the query parameters
// are one of the keys listed in the json file.
// Passes name, key, is a lead boolean to the request object with the attributes: _key_name, _key, _is_lead
const auth = async (req, res, next) => {
  const key = req.query.key
  if (key != undefined) {
    // removed && key.length === 11
    // Can add this rule if wanted

    // check to see if URL is for register, since the key would not be recorded yet
    if (req.method === 'POST' && req.url.includes('/user/')) {
      return next()
    } else if (key) {
      const foundUser = await User.findOne({ userId: key })
      if (foundUser != null) {
        req._key_name = foundUser.firstName // set the user's name of the key that was used to make the request
        req._key = key

        // check whether key is a director's, lead's, or member's key
        // this is used by the directorsOnly and membersOnly middleware
        if (foundUser.role === 'Director') {
          req._is_director = true
          req._is_lead = true
          req._is_member = true
        } else if (foundUser.role === 'Lead') {
          req._is_director = false
          req._is_lead = true
          req._is_member = true
        } else if (foundUser.role === 'Member') {
          req._is_director = false
          req._is_lead = false
          req._is_member = true
        } else {
          req._is_director = false
          req._is_lead = false
          req._is_member = false
        }

        return next()
      }
    }
  }

  // if not authenticated
  res.status(403).json({
    code: 403,
    message: 'Bad Key',
    success: false
  })
}

module.exports = auth
