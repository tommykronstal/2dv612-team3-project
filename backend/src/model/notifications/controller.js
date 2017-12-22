const Controller = require('../../lib/controller');
const notificationsFacade = require('./facade');
const userFacade = require('../user/facade');
const jwt = require('jsonwebtoken');

class notificationsContoller extends Controller {

    async findForUser(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
            return next({message: 'Could not find notification user.', statusCode: 400});
        }
    }


    async removeForUser(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
            return next({message: 'Could not remove notification for user.', statusCode: 400});
        }
    }
}

module.exports = new notificationsContoller(notificationsFacade);
