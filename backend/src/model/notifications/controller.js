const Controller = require('../../lib/controller');
const notificationsFacade = require('./facade');
const userFacade = require('../user/facade');
const jwt = require('jsonwebtoken');

class notificationsContoller extends Controller {

    /**
     * Finds all notifications for a user using userid
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async findForUser(req, res, next) {
        try {
            let userDoc = await userFacade.findById(req.body.userid);

            if(userDoc) {
                //To do
            } else {
                return next({message: 'Could not find user.', statusCode: 400});
            }
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
            let notification = await notificationsFacade.findById(req.body.threadid);

            if(notification) {
                await notificationsFacade.remove(notification);

                return res.status(201).json({message: 'Notification removed', statusCode: 201});
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
