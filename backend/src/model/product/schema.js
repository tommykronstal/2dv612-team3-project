const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  material_reference: { type: String, required: true }
});


module.exports = mongoose.model('Product', productSchema);