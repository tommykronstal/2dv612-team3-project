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

<<<<<<< HEAD
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }],

  date: {type: Date, default: Date.now, required: true }
=======
  
  posts: {
    type: [Post],

  },
  
  date: {type: Date, default: Date.now }
>>>>>>> 150355c5553b47bfa7620cf1d04028b9216ef83c

});

module.exports = mongoose.model('Thread', threadSchema)