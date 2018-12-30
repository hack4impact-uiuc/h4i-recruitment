// This module defines the mongoose models used for Mongo
const Candidate = require('./candidate')
const Interview = require('./interview').InterviewModel
const Stats = require('./stats')
const Match = require('./match')
const Comment = require('./comment').CommentModel
const Structure = require('./structure')

module.exports = {
  Candidate,
  Stats,
  Match,
  Interview,
  Comment,
  Structure
}
