const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
const keyData = require(keyPath)

const auth = (req, res, next) => {
  const key = req.query.key
  if (key != undefined) {
    if (key && key.length === 11) {
      keyVerified = keyData.keys.filter(currKey => currKey.key === key).length !== 0

      if (keyVerified) {
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
