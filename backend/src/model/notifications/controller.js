const Controller = require('../../lib/controller');
const notificationsFacade = require('./facade');
const userFacade = require('../user/facade');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;


class notificationsContoller extends Controller {

  /**
   * Finds all notifications for a user using userid
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async findForUser(req, res, next) {
    try {
      const decodedToken = jwt.verify(req.headers.authorization, 'keyboardcat');
      let userDoc = await userFacade.findOneLogin({ email: decodedToken.email });

      if (userDoc && userDoc.role === 'COMPANY_REP') {
        let notifications = await notificationsFacade.find({ userId: userDoc });
        return res.status(200).json({ error: false, notifications: notifications })

      } else {
        return next({ message: 'Could not find user.', statusCode: 400 });
      }
    } catch (e) {
      console.log(e);
      return next({ message: 'Could not find notification user.', statusCode: 400 });
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
      const decodedToken = jwt.verify(req.headers.authorization, 'keyboardcat');
      let notification = await notificationsFacade.findById(req.body.notificationid);

      if (notification) {
        let userDoc = await userFacade.findOneLogin({ email: decodedToken.email });

        if (userDoc._id.toString() === notification.userId.toString()) {
          await notificationsFacade.remove(notification);

          return res.status(201).json({ message: 'Notification removed', statusCode: 201 });
        } else
          return next({ message: 'User not authorized to remove notification.', statusCode: 400 });
      } else {
        return next({ message: 'Could not find notification,', statusCode: 400 });
      }
    } catch (e) {
      console.log(e);
      return next({ message: 'Could not remove notification for user.', statusCode: 400 });
    }
  }
}

module.exports = new notificationsContoller(notificationsFacade);
