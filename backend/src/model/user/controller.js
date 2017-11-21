const jwt = require('jsonwebtoken');
const Controller = require('../../lib/controller');
const userFacade = require('./facade');
const companyFacade = require('../company/facade');

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
    const {email, password, role, firstname: firstName, lastname: lastName} = req.body

    if (!email || !password || !role) return res.status(400).json({error: true})

    userFacade
      .create({ email, role, password, firstName, lastName})
      .then(userDocument => {
        return res.status(201)
          .json({error: false, token: jwt.sign({email, role}, jwtSecret)})
      })
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

      return checkRole(req, res, next, decoded);
    }).catch(() => res.status(500).json({error: true}));
  }
}

function checkRole(req, res, next, decoded) {
    const companyId = req.url.substring(13);

    if (decoded.role === 'ADMIN') return next();

    if (decoded.role === 'USER') return res.status(403).json({error: true, message: 'Forbidden'});

    if (decoded.role === 'COMPANY_USER') return res.status(403).json({error: true, message: 'Forbidden'});

    if (decoded.role === 'COMPANY_ADMIN' && req.url === "/api/company/" + companyId){

        companyFacade.findOne({ _id: companyId }).then((doc) => {
            if (!doc) return res.status(401).json({error: true, message: 'Invalid Company ID'});

            userFacade.findOne({ email: decoded.email }).then((user) => {
                if (!user) return res.status(401).json({error: true, message: 'Invalid token'});

                if (user._id.toString() !== doc.admin.toString()) {
                    return res.status(403).json({error: true, message: 'Forbidden. Company admin only'});
                }

                return next();
            }).catch((error) => res.status(500).json({error: true, message: 'Error: Cant find the given admin' + error}));

        }).catch(() => res.status(500).json({error: true, message: 'Error: Cant find the given company'}));
    }else {
        return res.status(403).json({error: true, message: 'Forbidden. There was no valid role found.'});
    }
}

module.exports = new UserController(userFacade);
