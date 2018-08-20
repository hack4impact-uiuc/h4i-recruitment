const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
const keyData = require(keyPath)

const auth = (req, res, next) => {
  const key = req.query.key
  if (key != undefined) {
    if (key && key.length === 11) {
      const keysFiltered = keyData.keys.filter(currKey => currKey.key === key)
      keyVerified = keysFiltered.length !== 0

      if (keyVerified) {
        req._key_name = keysFiltered[0].name // set the user's name of the key that was used to make the request
        req._key = key

        // check if there is a corresponding name for the key
        if (req._key_name == undefined) {
          msg = `The key '${key}'given doesn't have a corresponding name. Check the json file holding the keys.`
          console.error(msg)
          res.status(500).json({
            code: 500,
            message: 'Bad Key',
            success: false
          })
        }

        // check whether key is a lead's key or a member's key
        if (key.endsWith(process.env.LEAD_SUFFIX)) {
          req._is_lead = true
        } else {
          req._is_lead = false
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
