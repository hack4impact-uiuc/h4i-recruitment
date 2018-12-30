const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
const keyData = require(keyPath)
const leadSuffix = process.env.NODE_ENV === 'test' ? 'u' : process.env.LEAD_SUFFIX
const directorSuffix = process.env.NODE_ENV === 'test' ? 'u' : process.env.DIRECTOR_SUFFIX

// middleware around router
// checks whether key passed in through the query parameters
// are one of the keys listed in the json file.
// Passes name, key, is a lead boolean to the request object with the attributes: _key_name, _key, _is_lead
const auth = (req, res, next) => {
  const key = req.query.key
  if (key != undefined) {
    // removed && key.length === 11
    // Can add this rule if wanted
    if (key) {
      const keysFiltered = keyData.keys.filter(currKey => currKey.key === key)
      const keyVerified = keysFiltered.length !== 0

      if (keyVerified) {
        req._key_name = keysFiltered[0].name // set the user's name of the key that was used to make the request
        req._key = key

        // check if there is a corresponding name for the key
        if (req._key_name == undefined) {
          const msg = `The key '${key}' given doesn't have a corresponding name. Check the json file holding the keys.`
          console.error(msg)
          res.status(500).json({
            code: 500,
            message: msg,
            success: false
          })
          return
        }

        // check whether key is a lead's key or a member's key
        // this is used by the leadsOnly middleware
        if (key.endsWith(leadSuffix) || key.endsWith(directorSuffix)) {
          req._is_lead = true
        } else {
          req._is_lead = false
        }
        if (key.endsWith(directorSuffix)) {
          req._is_director = true
        } else {
          req._is_director = false
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
