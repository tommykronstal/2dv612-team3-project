const Controller = require('../../lib/controller');
const companyFacade = require('./facade');

class CompanyController extends Controller {

  registerCompany(req, res, next) {
    const { companyName, ...companyAdmin } = req.body;
    if (!companyName || !companyAdmin) return res.status(400).json({ error: true, message: 'Missing company details' }); // todo should probably be an error type instead?
    if (!companyAdmin.email || !companyAdmin.password) return res.status(400).json({ error: true, message: 'Missing company rep details' });

    let user = {
      firstName: companyAdmin.firstName,
      lastName: companyAdmin.lastName,
      email: companyAdmin.email,
      role: 'COMPANY_ADMIN',
      password: companyAdmin.password
    };

    let company = {
      companyName: companyName
    }

    const AlreadyExistPromises = [
      companyFacade.userSchema().find({'email': user.email}),
      companyFacade.find({'companyName': company.companyName})
    ];

    Promise.all(AlreadyExistPromises).then((exists) => {
      return exists
    }).then((exists) => {
      if(exists[0].length === 0 && exists[1].length === 0 ){
        companyFacade.userSchema().create(user)
        .then((userDoc) =>{
          company.admin = userDoc
          companyFacade.create(company)
          .then((companyDoc) => {
            return res.status(201).json({ error: false })
          })
        })
      }
      else if(exists[0].length > 0 && exists[1].length === 0) {
        return res.status(400).json({ error: true, message: 'User already exists'})
      }
      else if(exists[0].length > 0 && exists[1].length > 0) {
        return res.status(400).json({ error: true, message: 'User & Company already exists'})
      }
      else {
        return res.status(400).json({ error: true, message: 'Company already exists'})
      }
    }).catch(err => next(err));
  }
}

module.exports = new CompanyController(companyFacade);
