/* router middleware to only allow H4I members access
 * must be called AFTER the auth middleware
 */
const membersOnly = (req, res, next) => {
  if (!req._is_member) {
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
module.exports = membersOnly
