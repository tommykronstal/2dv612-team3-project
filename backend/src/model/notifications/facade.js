const Facade = require('../../lib/facade');
const notificationsSchema = require('./schema');

class NotificationsFacade extends Facade {

}

module.exports = new NotificationsFacade(notificationsSchema);
