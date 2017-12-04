const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const materialSchema = new Schema({
  name: {type: String},
  originalname: { type: String, required: true },
  filename: {type: String},
  path: { type: String },
  size: {type: Number},
  mimetype: {type: String},
  rating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
});


module.exports = mongoose.model('Material', materialSchema);
