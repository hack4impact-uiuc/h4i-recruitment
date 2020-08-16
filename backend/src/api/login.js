const passport = require('passport')
const router = require('express').Router()

// Defines the endpoint which will be serialized in state
const CALLBACK_ENDPOINT = '/api/login/callback'
// Where to go after a success
const LOGIN_SUCCESS_REDIRECT = process.env.FE_URL ? process.env.FE_URL : '/'

router.get('/', (req, res, next) => {
  // Construct the "callback" url by concatenating the current base URL (host) with the callback URL
  // Anything we put into Passport's state can be accessed after the login is successful, as it gets encoded in the URL
  const callbackUrl = `${req.protocol}://${req.get('host')}${CALLBACK_ENDPOINT}`
  const state = callbackUrl
    ? Buffer.from(JSON.stringify({ callbackUrl })).toString('base64')
    : undefined
  const auth = passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
    state
  })
  auth(req, res, next)
})

/* Serves as a middle point workaround for Google OAuth only allowing one callback URL
 * Essentially, we're using our main, production now deployment, for example lah.hack4impact.now.sh
 * Which is registered in Google OAuth console. We instruct Passport to redirect to this URL
 * (even if we're checking out, for example, branch-deploy.hack4impact.now.sh)
 * Based on the serialized info above, this will reconstruct the original callback URL (branch-deploy.hack4impact.now.sh)
 * And will redirect to branch-deploy.hack4impact.now.sh/CALLBACK_ENDPOINT
 * TLDR: will take PROD_URL/api/auth/login/redirectURI?queryparams -> ORIGINAL_URL/api/auth/login/callback?queryparams
 */
router.get('/redirectURI', (req, res) => {
  try {
    // If we are here, this endpoint is likely being run on the MAIN deployment
    const { state } = req.query
    // Grab the branch deployment (branch-deploy.hack4impact.now.sh) for example
    const { callbackUrl } = JSON.parse(Buffer.from(state, 'base64').toString())
    if (typeof callbackUrl === 'string') {
      // Reconstruct the URL and redirect
      const callbackURL = `${callbackUrl}?${req._parsedUrl.query}`
      return res.redirect(callbackURL)
    }
    // There was no base
    return res.redirect(CALLBACK_ENDPOINT)
  } catch (e) {
    return res.status(403).json({
      code: 403,
      message: 'Failed to redirect',
      success: false
    })
  }
})

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect(LOGIN_SUCCESS_REDIRECT)
  }
)

module.exports = router
