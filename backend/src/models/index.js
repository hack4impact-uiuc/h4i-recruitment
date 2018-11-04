const Candidate = require('./candidate')
const Interview = require('./interview').InterviewModel
const Stats = require('./stats')
const Match = require('./match')
const Comment = require('./comment').CommentModel

module.exports = {
  Candidate,
  Stats,
  Match,
  Interview,
  Comment
}
