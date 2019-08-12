const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { User } = require('../models')

// get all users
router.get(
  '/',
  errorWrap(async (req, res) => {
    const workspaces = await User.find()
    res.json({
      code: 200,
      result: workspaces,
      success: true
    })
  })
)

// post new user
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
      user: newUser
    })
    await newBsonUser.save()

    res.json({
      code: 200,
      message: `Successfully created new user ${newUser.firstName} ${newUser.lastName}`,
      success: true
    })
  })
)
