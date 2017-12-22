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


    /**
     * Used for removing a notification after a user has seen it and clicked on it
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async removeForUser(req, res, next) {
        try {
            let notification = await notificationsFacade.findById(req.param('threadid'));

            if(notification) {
                notificationsFacade.remove(notification);
            } else {
                return next({message: 'Could not find notification,', statusCode: 400});
            }
        } catch (e) {
            console.log(e);
            return next({message: 'Could not remove notification for user.', statusCode: 400});
        }
    }
}

module.exports = new notificationsContoller(notificationsFacade);
