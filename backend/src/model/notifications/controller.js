const Controller = require('../../lib/controller');
const notificationsFacade = require('./facade');

class notificationsContoller extends Controller {}

module.exports = new notificationsContoller(notificationsFacade);
