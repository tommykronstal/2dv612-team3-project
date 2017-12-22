const Controller = require('../../lib/controller');
const notificationsFacade = require('./facade');

class notificationsContoller extends Controller {

    async findForUser(req, res, next) {
        
    }


    async removeForUser(req, res, next) {

    }
}

module.exports = new notificationsContoller(notificationsFacade);
