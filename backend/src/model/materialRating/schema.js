const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const materialRatingSchema = new Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  materialid: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

materialRatingSchema.index({userid: 1, materialid: 1}, {unique: true});

module.exports =  mongoose.model('Rating', materialRatingSchema);
