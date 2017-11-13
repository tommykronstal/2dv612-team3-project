const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: String,
  role: String,
  password: String
});


module.exports = mongoose.model('User', userSchema);
