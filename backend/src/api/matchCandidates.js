const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Candidate, Match } = require('../models')

router.get(
  '/',
  errorWrap(async (req, res) => {
    const min = await Candidate.aggregate([
      {
        $group: {
          _id: {},
          min: { $min: '$facemashRankings.numOfMatches' }
        }
      }
    ])

    const cand1 = await Candidate.aggregate([
      { $match: { 'facemashRankings.numOfMatches': min[0].min } },
      { $sample: { size: 1 } }
    ])

    const id1 = cand1[0]._id

    const prev_matches = await Match.find({
      $or: [{ candidate1: id1 }, { candidate2: id1 }]
    })

    const prev_ids = [id1]
    for (let i = 0; i < prev_matches.length; i++) {
      if (prev_matches[i].candidate1.equals(id1)) {
        prev_ids.push(prev_matches[i].candidate2)
      } else {
        prev_ids.push(prev_matches[i].candidate1)
      }
    }

    const secondMin = await Candidate.aggregate([
      {
        $match: {
          _id: { $nin: prev_ids }
        }
      },
      {
        $group: {
          _id: {},
          min: { $min: '$facemashRankings.numOfMatches' }
        }
      }
    ])

    const cand2 = await Candidate.aggregate([
      {
        $match: {
          $and: [{ 'facemashRankings.numOfMatches': secondMin[0].min }, { _id: { $nin: prev_ids } }]
        }
      },
      { $sample: { size: 1 } }
    ])

    const id2 = cand2[0]._id

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
    match.submittedAt = new Date()

    // Find candidates involved with match to begin updating elo
    const candidate1 = await Candidate.findById(data.candidate1)
    const candidate2 = await Candidate.findById(data.candidate2)

    // Determine probabilities of winning prior to match
    const rating_constant = 30
    const cand1_elo = candidate1.facemashRankings.elo
    const cand2_elo = candidate2.facemashRankings.elo
    prob_id1 = 1.0 / (1.0 + Math.pow(10, (cand2_elo - cand1_elo) / 400))
    prob_id2 = 1.0 / (1.0 + Math.pow(10, (cand1_elo - cand2_elo) / 400))

    // Update elo of winning candidate, rounded to 1 decimal place
    if (match.winnerID.equals(candidate1._id)) {
      candidate1.facemashRankings.elo = Math.round((cand1_elo + rating_constant * (1 - prob_id1)) * 10) / 10
      candidate2.facemashRankings.elo = Math.round((cand2_elo + rating_constant * (0 - prob_id2)) * 10) / 10
      candidate1.save()
      candidate2.save()
    } else {
      candidate1.facemashRankings.elo = Math.round((cand1_elo + rating_constant * (0 - prob_id1)) * 10) / 10
      candidate2.facemashRankings.elo = Math.round((cand2_elo + rating_constant * (1 - prob_id2)) * 10) / 10
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
