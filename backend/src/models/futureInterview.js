const mongoose = require('mongoose')
/*
* This model is used by the schedule parser to describe a planned interview.
* In the future we can consider adding an 'added_by' field to denote who
* uploaded the schedule that contains this interview plan. We can also consider
* adding a FutureInterview schema to a candidate. For now it is just a model.
*/
const FutureInterview = new mongoose.Schema({
  candidates: [{ type: String }],
  interviewers: [{ type: String }],
  room: { type: String },
  date: { type: String },
  time: { type: String },
  workspaceId: { type: String }
})

module.exports = mongoose.model('FutureInterview', FutureInterview)
