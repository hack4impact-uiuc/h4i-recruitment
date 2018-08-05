const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Candidate, Match } = require('../models')

router.get(
  '/',
  errorWrap(async (req, res) => {
    // not very efficient, nor should we have this algorithm for matches
    // TODO: change this to a better algorithm
    const min = await Candidate.aggregate([{ $group: {
      _id: {},
      min: { $min: "$facemashRankings.numOfMatches" }
    }}]).min

    id1 = await Candidate.aggregate([
      { $match: { "facemashRankings.numOfMatches": min } },
      { $sample: { size: 1 } }
    ]).[0]_id
    if (min_candidates.length() === 1) {
      id1 = min_candidates[0]._id
      const secondMin = await Candidate.aggregate([
        { $match: { _id: { $ne: id1 } } }
        { $group: {
          _id: {},
          min: { $min: "$facemashRankings.numOfMatches" }
        }}
      ]).min

      id2 = await Candidate.aggregate([
        { $match: { "facemashRankings.numOfMatches": secondMin } },
        { $sample: { size: 1 } }
      ])[0]._id
    } else {
      id1 = min_candidates[0]._id
      id2 = min_candidates[1]._id
    }
    // create the match
    const match = new Match({
      candidate1: id1,
      candidate2: id2
    })
    await match.save()

    const candidate1 = await Candidate.findById(id1)
    candidate1.facemashRankings.numOfMatches += 1
    candidate1.save()

    const candidate2 = await Candidate.findById(id2)
    candidate2.facemashRankings.numOfMatches += 1
    candidate2.save()
    res.json({
      code: 200,
      message: '',
      result: {
        candidate1: candidate1,
        candidate2: candidate2,
        matchID: match._id
      },
      success: 'true'
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
      message: '',
      result: {},
      success: 'true'
    })
  })
)

module.exports = router
