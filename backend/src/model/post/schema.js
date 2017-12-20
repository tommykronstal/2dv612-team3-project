const mongoose = require('mongoose')
const userFacade = require('../user/facade')
const userSchema = require('../user/schema')
const Schema = mongoose.Schema

const postSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // User _id or switch to user.email?
  text: {type: String, required: true},
  date: {type: Date, default: Date.now},
  isRepresentative: {type: Boolean, default: false},
})

postSchema.pre('save', async function(next) {
  userFacade
    .findOne({_id: this.user})
    .then(({role}) => {
      if (role === 'COMPANY_REP') {
        this.isRepresentative = true
      }
      next()
    })
    .catch(e => console.log(e))
})

module.exports = mongoose.model('Post', postSchema)
