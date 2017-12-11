const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const annotationsSchema = new Schema({
  email: { type: String, required: true },
  materialid: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  annotation: { type: String, required: true }
});

annotationsSchema.index({email: 1, materialid: 1}, {unique: true});

module.exports =  mongoose.model('Annotation', annotationsSchema);
