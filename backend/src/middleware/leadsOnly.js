/* router middleware to only allow
 * keys with the leads suffix to access the endpoint
 * must be called AFTER the auth middleware
 */
const leadsOnly = (req, res, next) => {
  if (!req._is_lead) {
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
module.exports = leadsOnly
