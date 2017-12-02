const jwt = require('jsonwebtoken');
const Controller = require('../../lib/controller');
const userFacade = require('./facade');
const companyFacade = require('../company/facade');

const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process

class UserController extends Controller {
   async login(req, res, next) {
    const { email, password } = req.body; // todo presuming email and pw are sent on body params from loginform
     if (!email || !password) return res.status(400).json({ error: true, message: "username or password missing"});

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
        const token = jwt.sign(JSON.stringify({ firstName, email, role }), jwtSecret);
        return res.json({ token, error: false });
      }

    } catch (e) {
      // todo error handling here
      console.error(e);
      return next(e); // if(problem === Andras) {exec.shipIt();}
                      // true
      // .catch(() => res.status(500).json({ error: true })); top error in first findOne
      //   return res.status(500).json({ error: true, message: 'Invalid username or password' });
      //           return res.status(401).json({ error: true, message: 'Invalid username or password' }); if no match
      // .catch(e => res.status(401).json(e)) cant get the companyId
      //         return res.status(401).json({ error: true, message: 'Invalid username or password' });
    }
  }

  async register(req, res, next) {
    const {
      email, password, firstName, lastName
    } = req.body;
    const role = 'USER';
    try {
      //if (!email || !password) return res.status(400).json({ error: true });'
        //Create a Custom Error class with input message, name, statusCode
        if (!email || !password) {
            var customeError=  new Error("You must provide an email or password");
            customeError.name = "Invalid arguments";
            customeError.httpStatusCode = 400;
            throw customeError;
        }
      const userDocument = await userFacade.createUser({ email, password, firstName, lastName, role });
      return res.status(201).json({ error: false, token: jwt.sign({ email, role }, jwtSecret) });
    } catch (e) {
      console.log("Register error was caught!");
      console.error("Printing out error caught in register: ", e.message, e.httpStatusCode);
      return next(e);
    }
  }
}

module.exports = new UserController(userFacade);
