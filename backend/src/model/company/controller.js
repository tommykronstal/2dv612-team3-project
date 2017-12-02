//import { read } from 'fs';
const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // TODO move elsewhere

const Controller = require('../../lib/controller');
const companyFacade = require('./facade');
const userFacade = require('../user/facade');
const materialFacade = require('../material/facade');

class CompanyController extends Controller {

  async registerCompany(req, res, next) {
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

    try {
      const newUser = await userFacade.createUser(user); // returns an array on succ. if email is not unique i.e. user already exists execution will catch here
      const companyExists = await companyFacade.find({name: company.companyName})[0]; // todo no unique identifier for companies in schema so have to find first?
      if (companyExists) return res.status(400).json({ error: true, message: 'Company already exists'});
      company.admin = newUser;
      await companyFacade.create(company);
      return res.status(201).json({ error: false });
    } catch (e) {
      console.error(e);
    // } else if (exists[0].length > 0 && exists[1].length === 0) {
    //   return res.status(400).json({ error: true, message: 'User already exists' });
    // } else if (exists[0].length > 0 && exists[1].length > 0) {
    //   return res.status(400).json({ error: true, message: 'User & Company already exists' });
    // } else {
    //   return res.status(400).json({ error: true, message: 'Company already exists' });
      return next(e);
    }

  }

  async registerCompanyRep(req, res, next) {

    const decodedToken = jwt.verify(req.headers.authorization, jwtSecret);
    const  {
      firstName, lastName, email, password
    } = req.body;
    if (!email || !password) return res.status(400).json({ error: true, message: 'missing username or password'}); //todo is this check necessary everywhere?
    const role = 'COMPANY_REP';

    try {
      const repDoc = await  userFacade.create({
        firstName, lastName, email, password, role
      });
      const companyAdminDoc = await companyFacade.userSchema().findOne( { email: decodedToken.email }); // find the logged in users doc
      if (!companyAdminDoc) return res.status(400).json({ error: true, message: `Could not find company admin user ${decodedToken.email}` });
      const companyDoc = await companyFacade.findOne({ admin: companyAdminDoc }); // need to update the existing company doc with new rep
      if (!companyDoc) return res.status(400).json({ error: true, message: `Could not find company for admin ${decodedToken.email}` });
      companyDoc.reps.push(repDoc); // save the new rep to array of reps on company
      companyDoc.save(); // if saved isn't called the object id ref on previous line wont persist
      return res.status(201).json({ error: false, message: `company rep ${repDoc.email} created` });
    } catch (e) {
      if (e.code === 11000) return res.status(400).json({ error: true, message: 'User already exists' });
      return next(e);
    }
  }
}

module.exports = new CompanyController(companyFacade);
