const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const companyRepSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
});

module.exports = mongoose.model('CompanyRep', companyRepSchema);
