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
      return next(e); // problem === Andras
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
      if (!email || !password) return res.status(400).json({ error: true });
      const userDocument = await userFacade.createUser({ email, password, firstName, lastName, role });
      return res.status(201).json({ error: false, token: jwt.sign({ email, role }, jwtSecret) });
    } catch (e) {
      console.error(e);
      return next(e);
    }


  }

  authorize(req, res, next) {
    if (req.headers.authorization === undefined) {
      return res.status(401).json({ error: true, message: 'There was no token in the header' });
    }

    const token = req.headers.authorization;
    let decoded;

    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (e) {
      return res.status(401).json({ error: true, name: e.name, message: e.message });
    }

    const mongoUserQuery = {
      $and: [
        { 'email': decoded.email },
        { 'role': decoded.role }
      ]
    };

    userFacade.findOne(mongoUserQuery).then((doc) => {
      if (!doc) return res.status(401).json({ error: true, message: 'Invalid token' });

      return checkRole(req, res, next, decoded);
    }).catch(() => res.status(500).json({ error: true }));
  }
}

function checkRole(req, res, next, decoded) {
  const companyId = req.url.substring(13);

  if (decoded.role === 'ADMIN') return next();

  if (decoded.role === 'USER') return res.status(403).json({ error: true, message: 'Forbidden' });

  if (decoded.role === 'COMPANY_REP') return res.status(403).json({
    error: true,
    message: 'Forbidden'
  });

  if (decoded.role === 'COMPANY_ADMIN' && req.url === '/api/company/' + companyId) {

    companyFacade.findOne({ _id: companyId }).then((doc) => {
      if (!doc) return res.status(401).json({ error: true, message: 'Invalid Company ID' });

      userFacade.findOne({ email: decoded.email }).then((user) => {
        if (!user) return res.status(401).json({ error: true, message: 'Invalid token' });

        if (user._id.toString() !== doc.admin.toString()) {
          return res.status(403).json({
            error: true,
            message: 'Forbidden. Company admin ID does not match the User ID'
          });
        }

        return next();
      }).catch((error) => res.status(500).json({
        error: true,
        message: 'Error: Cant find the given admin' + error
      }));

    }).catch(() => res.status(500).json({
      error: true,
      message: 'Error: Cant find the given company'
    }));
  } else {
    return res.status(403).json({
      error: true,
      message: 'Forbidden. There was no valid role found for the given request.'
    });
  }
}

module.exports = new UserController(userFacade);
