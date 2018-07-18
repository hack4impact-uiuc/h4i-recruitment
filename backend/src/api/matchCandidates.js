const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Candidate, Match } = require('../models')

router.get(
  '/',
  errorWrap(async (req, res) => {
    // not very efficient, nor should we have this algorithm for matches
    // TODO: change this to a better algorithm
    const candidates = await Candidate.aggregate([{ $sample: { size: 5 } }])
    // create the match
    const match = new Match({
      candidate1: candidates[0]._id,
      candidate2: candidates[1]._id
    })
    await match.save()
    res.json({
      result: {
        candidate1: candidates[0],
        candidate2: candidates[1],
        matchID: match._id
      }
    })
  })
)

router.post(
  '/',
  errorWrap(async (req, res) => {
    const data = req.body

    // given the matchID that was passed from the backend
    // when a match was created
    // This will verify whether the match exists
    // so any frontend client can't "fake" a match
    let match = await Match.findById(data.matchID)
    match.winnerID = data.winnerID // update the winner
    match.save()
    res.json({
      code: 200,
      message: "",
      result: {},
      success: 'true'
     })
  })
)

module.exports = router
