const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const annotationSchema = new Schema({
  email: {type: String},
  materialid: {type: mongoose.Schema.Types.ObjectId, ref: 'Material'},
  annotation: {type: String}

});


module.exports = mongoose.model('Annotation', annotationSchema);
