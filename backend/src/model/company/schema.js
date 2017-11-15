const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const companySchema = new Schema({
  name: { type: String, required: true },
  reps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CompanyRep'}]
});

module.exports = mongoose.model('Company', companySchema);
