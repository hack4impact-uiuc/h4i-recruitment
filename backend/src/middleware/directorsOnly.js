/* router middleware to only allow
 * keys with the director suffix to access the endpoint
 * must be called AFTER the auth middleware
 */
const directorsOnly = (req, res, next) => {
  if (!req._is_director) {
    const msg = `The key '${
      req._key
    }' doesn't have the correct privileges. Please contact the admin.`
    console.error(msg)
    res.status(403).json({
      code: 403,
      message: msg,
      success: false
    })
    return
  }
  next()
}
module.exports = directorsOnly
