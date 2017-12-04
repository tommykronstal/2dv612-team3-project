const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const materialRatingSchema = new Schema({
  userid: { type: String, unique: true, required: true },
  materialid: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', unique: true, required: true },
  rating: { type: int, required: true }
});


module.exports =  materialRatingSchema;
