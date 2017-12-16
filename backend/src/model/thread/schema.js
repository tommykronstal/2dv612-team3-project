const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema({
  title: {type: String, unique: true, required: true },
  question: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  date: {type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Thread', threadSchema)
