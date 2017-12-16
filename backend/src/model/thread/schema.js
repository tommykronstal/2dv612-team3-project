const mongoose = require('mongoose')
const Schema = mongoose.Schema

let minLength = 10;
let maxLength = 140;

const threadSchema = new Schema({
  title: {type: String, min: minLength, max: maxLength, unique: true, required: true },
  question: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }],
  date: {type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Thread', threadSchema)
