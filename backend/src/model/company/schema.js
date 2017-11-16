const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }, // a user can only be admin for a company and a company can only have one admin? correct?
  reps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CompanyRep' }]
});

module.exports = mongoose.model('Company', companySchema);
