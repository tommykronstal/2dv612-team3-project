const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  materials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  companyName: {
    type: String
  },
  rating: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }]
})

module.exports = mongoose.model('Product', productSchema)