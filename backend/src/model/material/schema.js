const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const materialSchema = new Schema({
  name: {type: String},
  originalname: { type: String, required: true },
  filename: {type: String},
  path: { type: String },
  size: {type: Number},
  mimetype: {type: String},
  rating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}],
  avgRating: {type: Number, required: true, default: 0}
});


module.exports = mongoose.model('Material', materialSchema);
