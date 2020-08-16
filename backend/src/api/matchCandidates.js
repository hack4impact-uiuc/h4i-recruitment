/*
 * Most of the logic for faceMash
 */
const express = require('express')
const router = express.Router()
const { errorWrap } = require('../middleware')
const { Candidate, Match } = require('../models')
const { statusEnum } = require('../utils/enums')

router.get(
  '/',
  errorWrap(async (req, res) => {
    // Get minimum number of times a candidate has been matched
    const min = await Candidate.aggregate([
      {
        $match: {
          status: { $ne: statusEnum.REJECTED }
        }
      },
      {
        $group: {
          _id: {},
          min: { $min: '$facemashRankings.numOfMatches' }
        }
      }
    ])

    // Select a random candidate out of those with the minimum number of matches
    const cand1 = await Candidate.aggregate([
      {
        $match: {
          $and: [
            { 'facemashRankings.numOfMatches': min[0].min },
            { status: { $ne: statusEnum.REJECTED } }
          ]
        }
      },
      { $sample: { size: 1 } }
    ])

    const id1 = cand1[0]._id

    // Get all previous matches this candidate has participated in
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

    // Calculate minimum number of matches that any candidate besides the first
    // chosen candidate and the other candidates they have matched against
    const secondMin = await Candidate.aggregate([
      {
        $match: {
          $and: [{ _id: { $nin: prev_ids } }, { status: { $ne: statusEnum.REJECTED } }]
        }
      },
      {
        $group: {
          _id: {},
          min: { $min: '$facemashRankings.numOfMatches' }
        }
      }
    ])

    // Choose random second candidate out of those who have both not matched
    // with the first candidate and who have the secondMin number of matches
    const cand2 = await Candidate.aggregate([
      {
        $match: {
          $and: [
            { 'facemashRankings.numOfMatches': secondMin[0].min },
            { _id: { $nin: prev_ids } },
            { status: { $ne: statusEnum.REJECTED } }
          ]
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
      success: true
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
    match.submittedBy = req._key_name
    match.submittedByKey = req._key

    // Find candidates involved with match to begin updating elo
    const candidate1 = await Candidate.findById(data.candidate1)
    const candidate2 = await Candidate.findById(data.candidate2)

    // Determine probabilities of winning prior to match
    // Since rating_constant stays static in out case, this constant could
    // technically be anything since the ranking is relative and the actual elo
    // score itself means nothing. We chose 30 as it is large enough to avoid
    // rounding error skewing our results. 30 is also small enough to avoid
    // negative elo in our situation.
    const rating_constant = 30
    const cand1_elo = candidate1.facemashRankings.elo
    const cand2_elo = candidate2.facemashRankings.elo
    const prob_id1 = 1.0 / (1.0 + Math.pow(10, (cand2_elo - cand1_elo) / 400))
    const prob_id2 = 1.0 / (1.0 + Math.pow(10, (cand1_elo - cand2_elo) / 400))

    // Update elo of winning candidate, rounded to 1 decimal place
    if (match.winnerID.equals(candidate1._id)) {
      candidate1.facemashRankings.elo =
        Math.round((cand1_elo + rating_constant * (1 - prob_id1)) * 10) / 10
      candidate2.facemashRankings.elo =
        Math.round((cand2_elo + rating_constant * (0 - prob_id2)) * 10) / 10
      await candidate1.save()
      await candidate2.save()
    } else {
      candidate1.facemashRankings.elo =
        Math.round((cand1_elo + rating_constant * (0 - prob_id1)) * 10) / 10
      candidate2.facemashRankings.elo =
        Math.round((cand2_elo + rating_constant * (1 - prob_id2)) * 10) / 10
      await candidate1.save()
      await candidate2.save()
    }

    await match.save()
    res.json({
      code: 200,
      message: '',
      result: {},
      success: true
    })
  })
)

module.exports = router
