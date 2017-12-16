const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User _id or switch to user.email?
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRepresentative: { type: Boolean, default: false }
});

module.exports = mongoose.model('Post', productSchema)