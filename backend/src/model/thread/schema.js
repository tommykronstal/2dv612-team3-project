const mongoose = require('mongoose')
const Schema = mongoose.Schema
const notificationsFacade = require('../notifications/facade');
const companyFacade = require('../company/facade');


const threadSchema = new Schema({
  title: {
      type: String,
      trim: true,
      unique: true,
      required:  [true, 'Must set a thread title'],
      maxLength: [140, 'Title is too long'], // i took the same values yahoo answers use and we all know they have all the answers. right??
      minLength: [10, 'Title is too short']
  },

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  date: {type: Date, default: Date.now }

});

threadSchema.pre('save',  async function (next)  {
  if (this.isNew) { // remove to also generate notification on new answers
    let companies = await companyFacade.findByCategoryId(this.category);
    companies
      .filter(c => c.products.length > 0)
      .forEach(c => c.reps.forEach(async rep => await notificationsFacade.create({
        threadId: this._id,
        threadTitle: this.title,
        userId: rep
      })));
  }

  return next();
});

module.exports = mongoose.model('Thread', threadSchema)
