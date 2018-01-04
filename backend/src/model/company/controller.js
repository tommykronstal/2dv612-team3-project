const Controller = require('../../lib/controller');
const companyFacade = require('./facade');
const userFacade = require('../user/facade');

class CompanyController extends Controller {

  async registerCompany(req, res, next) {
    const {
      companyName, firstName, lastName, email, password
    } = req.body;

    if (!companyName) return next({message: 'Missing company details', statusCode: 400 }); // todo should probably be an error type instead?
    if (!email || !password) return next({message: 'Missing company rep details', statusCode: 400 });

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
      if (companyExists) return next({message: 'Company already exists', statusCode: 400});
      company.admin = newUser;
      await companyFacade.create(company);
      return res.status(201).json({ error: false });
    } catch (e) {
      return next(e);
    }
  }

  async registerCompanyRep(req, res, next) {
    const  {
      firstName, lastName, email, password
    } = req.body;
    if (!email || !password) return next({message: 'missing username or password', statusCode: 400});
    const role = 'COMPANY_REP';

    try {
      // TODO Swap create to createUser()?
      const repDoc = await  userFacade.create({
        firstName, lastName, email, password, role
      });

      const companyAdminDoc = await companyFacade.userSchema().findOne( { email: res.locals.email }); // find the logged in users doc
      if (!companyAdminDoc) return next({ error: true, message: `Could not find company admin user ${res.locals.email}`, statusCode: 400 });
      const companyDoc = await companyFacade.findOne({ admin: companyAdminDoc }); // need to update the existing company doc with new rep
      if (!companyDoc) return next({message: `Could not find company for admin ${res.locals.email}`, statusCode: 400 });
      companyDoc.reps.push(repDoc); // save the new rep to array of reps on company
      companyDoc.save(); // if saved isn't called the object id ref on previous line wont persist
      return res.status(201).json({ error: false, message: `company rep ${repDoc.email} created` });
    } catch (e) {
      if (e.code === 11000) return next({message: 'User already exists', statusCode: 400 });
      return next(e);
    }
  }
}

module.exports = new CompanyController(companyFacade);
