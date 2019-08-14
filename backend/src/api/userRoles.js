const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { User } = require('../models')

// get all users
router.get(
  '/',
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
      message: `Successfully recorded new user ${newUser.email}`,
      success: true
    })
  })
)

// update a user's role
router.put(
  '/:tokenId',
  errorWrap(async (req, res) => {
    const tokenId = req.params.tokenId
    if (!tokenId || !req.body.role) {
      return res.json({
        code: 400,
        message: 'Token ID and new role are required.',
        success: false
      })
    }

    await User.findOneAndUpdate({ tokenId }, { $set: { role: req.body.role } })
    res.json({
      code: 200,
      message: 'Successfully updated user',
      success: true
    })
  })
)
module.exports = router
