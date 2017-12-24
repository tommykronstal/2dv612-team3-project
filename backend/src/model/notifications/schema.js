const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema ({
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    threadTitle: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Notifications', notificationsSchema);
