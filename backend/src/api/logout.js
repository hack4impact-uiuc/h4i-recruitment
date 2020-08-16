const router = require('express').Router()

router.post('/', (req, res) => {
  req.logout()
  res.json({
    code: 200,
    message: 'Logged out.',
    success: true
  })
})

module.exports = router
