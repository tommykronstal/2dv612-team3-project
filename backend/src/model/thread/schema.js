const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const postFacade = require("../post/facade")

let maxLength = 140;
let minLength = 10;


const threadSchema = new Schema({
  title: {type: String, required: true },
  question: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }],
  date: {type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Thread', threadSchema)