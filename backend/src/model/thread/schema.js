const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = mongoose.model('Post').schema


const threadSchema = new Schema({
  question: {
    title: {
      type: String,
      trim: true,
      unique: true,
      required:  [true, 'Must set a thread title'],
      maxLength: [140, 'Title is too long'], // i took the same values yahoo answers use and we all know they have all the answers. right??
      minLength: [10, 'Title is too short']
    }
  },

  posts: {
    type: [Post],

  },

  date: {type: Date, default: Date.now }

});

module.exports = mongoose.model('Thread', threadSchema)