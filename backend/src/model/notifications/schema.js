const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema ({
    threadid: {type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true},
    threadtitle: {type: String, required: true},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Notifications', notificationsSchema)
