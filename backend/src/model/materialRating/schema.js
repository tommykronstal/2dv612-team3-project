const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const materialRatingSchema = new Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  materialid: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', unique: true, required: true },
  rating: { type: Number, required: true }
});


module.exports =  materialRatingSchema;
