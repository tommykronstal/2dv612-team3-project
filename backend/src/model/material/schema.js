const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const materialSchema = new Schema({
  name: {type: String},
  originalName: { type: String, required: true },
  filename: {type: String},
  path: { type: String },
  size: {type: Number},
  mimetype: {type: String}
});


module.exports =  materialSchema;
