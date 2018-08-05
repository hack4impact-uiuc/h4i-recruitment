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
    ])[0]._id

    const prev_matches = await Match.aggregate([
      { $match: {
        $or: [
          { candidate1: id1 },
          { candidate2: id1 }
        ]
      }
    ])

    const prev_ids = []
    for (m : prev_matches) {
      if (m.candidate1 === id1) {
        prev_ids.append(m.candidate2)
      } else {
        prev_ids.append(m.candidate1)
      }
    }

    const secondMin = await Candidate.aggregate([
      { $match: {
        $and: [
          { _id: { $ne: id1 } },
          { _id: { $nin: prev_ids } }
        ]
      } }
      { $group: {
        _id: {},
        min: { $min: "$facemashRankings.numOfMatches" }
      }}
    ]).min

    id2 = await Candidate.aggregate([
      { $match: { $and: [
          { "facemashRankings.numOfMatches": secondMin },
          { _id: { $nin: prev_ids }}
      ]}},
      { $sample: { size: 1 } }
    ])[0]._id

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

    // Find candidates involved with match to begin updating elo
    const candidate1 = await Candidate.findById(data.candidate1)
    const candidate2 = await Candidate.findById(data.candidate2)

    // Determine probabilities of winning prior to match
    const rating_constant = 30
    const cand1_elo = candidate1.facemashRankings.elo
    const cand2_elo = candidate2.facemashRankings.elo
    prob_id1 = ( 1.0 / (1.0 + Math.pow(10, ((cand2_elo - cand1_elo) / 400)) ))
    prob_id2 = ( 1.0 / (1.0 + Math.pow(10, ((cand1_elo - cand2_elo) / 400)) ))

    // Update elo of winning candidate
    if(match.winnerID == candidate1.id) {
      candidate1.facemashRankings.elo = cand1_elo + rating_constant*(1-prob_id1)
      candidate2.facemashRankings.elo = cand2_elo + rating_constant*(0-prob_id2)
      candidate1.save()
      candidate2.save()
    } else {
      candidate1.facemashRankings.elo = cand1_elo + rating_constant*(0-prob_id1)
      candidate2.facemashRankings.elo = cand2_elo + rating_constant*(1-prob_id2)
      candidate1.save()
      candidate2.save()
    }

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
