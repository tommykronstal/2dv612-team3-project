const mongoose = require('mongoose')
const userFacade = require('../user/facade')
const Schema = mongoose.Schema

const postSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User _id or switch to user.email?
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRepresentative: { type: Boolean, default: false }
});

postSchema.pre('save', async function(next) {
  await userFacade.findOne({_id: this.user._id}).then(userDoc => {
    if (userDoc.role === 'COMPANY_REP') {
      this.isRepresentative = true
    }
  }).catch(e => {
    console.log(e)
  })

  next()
})

module.exports = mongoose.model('Post', postSchema)
