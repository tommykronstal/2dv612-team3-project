//import { read } from 'fs';
const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // TODO move elsewhere

const Controller = require('../../lib/controller');
const companyFacade = require('./facade');
const userFacade = require('../user/facade');

class CompanyController extends Controller {

  registerCompany(req, res, next) {
    const {
      companyName, firstName, lastName, email, password
    } = req.body;

    if (!companyName) return res.status(400).json({ error: true, message: 'Missing company details' }); // todo should probably be an error type instead?
    if (!email || !password) return res.status(400).json({ error: true, message: 'Missing company rep details' });

    const role = 'COMPANY_ADMIN';
    const user = {
      firstName, lastName, email, role, password
    };

    const company = {
      companyName
    };

    const AlreadyExistPromises = [
      companyFacade.userSchema().find({ email: user.email }),
      companyFacade.find({name: company.companyName})
    ];

    Promise.all(AlreadyExistPromises).then(exists => exists).then((exists) => {
      if (exists[0].length === 0 && exists[1].length === 0 ) {
        companyFacade.userSchema().create(user)
          .then((userDoc) => {
            company.admin = userDoc;
            companyFacade.create(company)
              .then(companyDoc => res.status(201).json({ error: false }));
          });
      } else if (exists[0].length > 0 && exists[1].length === 0) {
        return res.status(400).json({ error: true, message: 'User already exists' });
      } else if (exists[0].length > 0 && exists[1].length > 0) {
        return res.status(400).json({ error: true, message: 'User & Company already exists' });
      } else {
        return res.status(400).json({ error: true, message: 'Company already exists' });
      }
    }).catch(err => next(err));
  }

  registerCompanyRep(req, res, next) {

    const decodedToken = jwt.verify(req.headers.authorization, jwtSecret);
    const  {
      firstName, lastName, email, password
    } = req.body;
    const role = 'COMPANY_REP';

    userFacade.create({
      firstName, lastName, email, password, role
    }).then((repDoc) => {
      companyFacade.userSchema().findOne( { email: decodedToken.email }).then((companyAdminDoc) => { // find the logged in users doc
        if (!companyAdminDoc) return res.status(400).json({ error: true, message: `Could not find company admin user ${decodedToken.email}` });
        companyFacade.findOne({ admin: companyAdminDoc }).then((companyDoc) => { // need to update the existing company doc with new rep
          if (!companyDoc) return res.status(400).json({ error: true, message: `Could not find company for admin ${decodedToken.email}` });
          companyDoc.reps.push(repDoc); // save the new rep to array of reps on company
          companyDoc.save(); // if saved isn't called the object id ref on previous line wont persist
          return res.status(201).json({ error: false, message: `company rep ${repDoc.email} created` });
        }).catch(e => console.error(e)); // todo not sure what errors we could get
      }).catch(e => console.error(e));
    }).catch((e) => {
      if (e.code === 11000) return res.status(400).json({ error: true, message: 'User already exists' });
    });
  }
}

module.exports = new CompanyController(companyFacade);
