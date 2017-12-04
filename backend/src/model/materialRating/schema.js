const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const materialRatingSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  materialId: { type: String, unique: true, required: true },
  rating: { type: int, required: true }
});


module.exports =  materialRatingSchema;
