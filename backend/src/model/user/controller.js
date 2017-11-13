import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const Controller = require('../../lib/controller');
const userFacade = require('./facade');

const jwtSecret = 'tempDevSecret'; // todo should be in a .env or config file or read from process

class UserController extends Controller {

  login(req, res, next) {
    const { email, password } = req.body; // todo presuming email and pw are sent on body params from loginform
    const saltedPassword = `${password}agileSalt`;    // todo save salt in .env or similar variable not here
    const saltedPassHash = crypto.createHash('sha256').update(saltedPassword).digest('hex');
    const mongoUserQuery = {
      $and: [
        { 'email': email },
        { 'password': saltedPassHash }
      ]
    };

    userFacade.find(mongoUserQuery).then((doc) => {
      if (!doc) return res.sendStatus(401);
      const role = doc.role;
      const userDetailsToHash = email + role;
      const token = jwt.sign(userDetailsToHash, jwtSecret);
      res.data = { token, role, error: false };
      return res.sendStatus(200);
    });
  }

  register(req, res, next) {
    const newUser = req.body.newUserReg;
    newUser.password = `${newUser.password}${jwtSecret}`;
    newUser.password = crypto.createHash('sha256').update(newUser.password).digest('hex');

    userFacade.create(newUser).then((err, data) => {
      if (err) return res.sendStatus(401);
    }).then((newReg) => {
      const newUserDetails = newReg.toObject();
      if (newUserDetails._id) {
        res.data = { role: 'something' }; // todo what happens on succcessful reg and what do we return?
        return res.sendStatus(200);
      }
      // send some type of error message/object i.e. user already exist/email exists etc
      res.sendStatus(401);
    }).catch((error) => { console.error(error); });
  }
}

module.exports = new UserController(userFacade);
