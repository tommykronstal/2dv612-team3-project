const jwt = require('jsonwebtoken');
const Controller = require('../../lib/controller');
const userFacade = require('./facade');
const companyFacade = require('../company/facade');

const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process

class UserController extends Controller {
   async login(req, res, next) {
    const { email, password } = req.body; // todo presuming email and pw are sent on body params from loginform
       console.log(req);
     if (!email || !password) return next({ error: true, message: "username or password missing", statusCode: 400});

    try {
      const doc = await userFacade.findOneLogin({ email });
      await doc.comparePassword(password);
      const role = doc.role;
      const firstName = doc.firstName;

      if (role === 'COMPANY_ADMIN' || role === "COMPANY_REP") {
        const companyId = await companyFacade.getCompanyID(doc);
        const token = jwt.sign(JSON.stringify({ firstName, email, role, companyId }), jwtSecret);
        return res.json({ token, error: false });
      } else { // Everything went ok, logging in!
        const token = jwt.sign(JSON.stringify({ firstName, email, role, userId: doc._id }), jwtSecret);
        return res.json({ token, error: false });
      }
    } catch (e) {
      console.log("Error printing from login");
      return next(e);
    }
  }

  async register(req, res, next) {
    const {
      email, password, firstName, lastName
    } = req.body;
    const role = 'USER';
    try {
      if (!email || !password) return res.status(400).json({ error: true });
      const userDocument = await userFacade.createUser({ email, password, firstName, lastName, role });
      return res.status(201).json({ error: false, token: jwt.sign({ firstName, email, role, userId: userDocument._id }, jwtSecret) });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = new UserController(userFacade);
