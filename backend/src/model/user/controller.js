const jwt = require('jsonwebtoken');
const Controller = require('../../lib/controller');
const userFacade = require('./facade');

const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process

class UserController extends Controller {
  login(req, res, next) {
    const { email, password } = req.body; // todo presuming email and pw are sent on body params from loginform

    userFacade.findOne({email: req.body.email}).then((doc) => {

      if (!doc)  {
          return res.status(401).json({error: true, message: 'Invalid username or password'});
      }

      doc.comparePassword(req.body.password, function(error, match) {
          if (error) {
              return res.status(500).json({error: true, message: 'Invalid username or password'});
          }

          if (match) {
            const role = doc.role;
            const userDetailsToHash = JSON.stringify({ email, role });
            const token = jwt.sign(userDetailsToHash, jwtSecret);

            // Everything went ok, logging in!
            return res.json({ token, error: false });
          } else {

              // Wrong password is provided
              return res.status(401).json({error: true, message: 'Invalid username or password'});
          }
      });
  })
      .catch(() => res.status(500).json({ error: true }));
  }

  register(req, res, next) {
    const newUser = req.body;

    if (!(newUser.email || newUser.password)) return res.status(400).json({ error: true });

    userFacade.create(newUser).then((doc) => {

      const userDetailsToHash = JSON.stringify({ email: doc.email, role: doc.role });
      const token = jwt.sign(userDetailsToHash, jwtSecret);

      return res.json({ token });
    }).catch(() => res.status(500).json({ error: true }));
  }

  authorize(req, res, next) {
    if (req.headers.authorization === undefined) {
      return res
        .status(401)
        .json({error: true, message: 'There was no token in the header'})
    }

    const token = req.headers.authorization
    let decoded

    try {
      decoded = jwt.verify(token, jwtSecret)
    } catch (e) {
      console.log(e)
      return res
        .status(401)
        .json({error: true, name: e.name, message: e.message})
    }

    const mongoUserQuery = {
      $and: [{email: decoded.email}, {role: decoded.role}],
    }

    userFacade
      .findOne(mongoUserQuery)
      .then(doc => {
        if (!doc)
          return res.status(401).json({error: true, message: 'Invalid token'})

        next()
      })
      .catch(() => res.status(500).json({error: true}))
  }
}

module.exports = new UserController(userFacade)
