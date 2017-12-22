const Facade = require('../../lib/facade');
const notificationsSchema = require('./schema');

class NotificationsSchema extends Facade {}

module.exports = new PostFacade(notificationsSchema);
