const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
  articleID: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },  
  materials:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }]
});


module.exports = mongoose.model('Product', productSchema);