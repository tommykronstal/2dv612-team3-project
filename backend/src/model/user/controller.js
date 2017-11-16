const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Controller = require('../../lib/controller');
const userFacade = require('./facade');

const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process
const salt = 'jod';

class UserController extends Controller {

  login(req, res, next) {
    const { email, password } = req.body; // todo presuming email and pw are sent on body params from loginform
    const saltedPassword = `${password}${salt}`;    // todo save salt in .env or similar variable not here
    const saltedPassHash = crypto.createHash('sha256').update(saltedPassword).digest('hex');
    const mongoUserQuery = {
      $and: [
        { 'email': email },
        { 'password': saltedPassHash }
      ]
    };

    userFacade.findOne(mongoUserQuery).then((doc) => {

      if (!doc) return res.status(401).json({error: true, message: 'Invalid username or password.'});

      const role = doc.role;
      const userDetailsToHash = JSON.stringify({ email, role });
      const token = jwt.sign(userDetailsToHash, jwtSecret);

      return res.json({ token, error: false });
    })
      .catch(() => res.status(500).json({ error: true }));
  }

  register(req, res, next) {
    const newUser = req.body;

    if (!(newUser.email || newUser.password)) return res.status(400).json({ error: true });

    newUser.role = 'ADMIN'; // todo temp hardcoded handle roles on reg

    newUser.password = `${newUser.password}${salt}`;
    newUser.password = crypto.createHash('sha256').update(newUser.password).digest('hex');

    userFacade.create(newUser).then((doc) => {

      const userDetailsToHash = JSON.stringify({ email: doc.email, role: doc.role });
      const token = jwt.sign(userDetailsToHash, jwtSecret);

      return res.json({ token });
    }).catch(() => res.status(500).json({ error: true }));
  }

  authorize(req, res, next) {

    if (req.headers.authorization === undefined){
        return res.status(401).json({error: true, message: 'There was no token in the header'});
    }

    const token = req.headers.authorization;
    let decoded;
    //TODO FIX .verify error
    try {
        decoded = jwt.verify(token, jwtSecret);
    }catch (e){
      console.log(e);
        return res.status(401).json({error: true, name: e.name, message: e.message});
    }


    const mongoUserQuery = {
        $and: [
            { 'email': decoded.email },
            { 'role': decoded.role }
        ]
    };

    userFacade.findOne(mongoUserQuery).then((doc) => {
      if (!doc) return res.status(401).json({error: true, message: 'Invalid token.'});

      next();
    }).catch(() => res.status(500).json({error: true}));
  }
}

module.exports = new UserController(userFacade);
