const mongoose = require('mongoose')

const Comment = new mongoose.Schema(
  {
    writerId: { type: String },
    writerName: { type: String },
    text: { type: String }
  },
  { timestamps: { createdAt: 'created_at' } }
)
// for Candidate Schema to use
// Adding a Schema to another Schema
// requires it to be a Schema, not a model
module.exports.CommentSchema = Comment
// for creating a Model
module.exports.CommentModel = mongoose.model('Comment', Comment)
