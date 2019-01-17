// This module defines the mongoose models used for Mongo
const Candidate = require('./candidate')
const Interview = require('./interview').InterviewModel
const FutureInterview = require('./futureInterview')
const Stats = require('./stats')
const Match = require('./match')
const Comment = require('./comment').CommentModel

module.exports = {
  Candidate,
  Stats,
  Match,
  Interview,
  FutureInterview,
  Comment
}
