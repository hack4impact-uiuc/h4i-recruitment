const express = require('express')
const router = express.Router()
const { directorsOnly, errorWrap } = require('../middleware')
const { User } = require('../models')

// get all users
router.get(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    const users = await User.find()
    res.json({
      code: 200,
      result: users,
      success: true
    })
  })
)

// post new user
// needed during registration, so not directorsOnly
router.post(
  '/',
  errorWrap(async (req, res) => {
    const newUser = req.body
    if (!newUser) {
      return res.json({
        code: 400,
        message: 'Invalid user in request body',
        success: false
      })
    }

    const newBsonUser = new User({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      userId: newUser.userId,
      email: newUser.email,
      role: newUser.role
    })
    await newBsonUser.save()

    res.json({
      code: 200,
      message: `Successfully recorded new user ${newUser.email}`,
      success: true
    })
  })
)

// update a user's role
router.put(
  '/',
  [directorsOnly],
  errorWrap(async (req, res) => {
    if (!req.body.email || !req.body.role) {
      return res.json({
        code: 400,
        message: 'Email and new role are required.',
        success: false
      })
    }

    await User.findOneAndUpdate({ email: req.body.email }, { $set: { role: req.body.role } })
    res.json({
      code: 200,
      message: 'Successfully updated user',
      success: true
    })
  })
)
module.exports = router
