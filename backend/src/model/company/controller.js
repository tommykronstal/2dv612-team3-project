//import { read } from 'fs';
const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // TODO move elsewhere

const Controller = require('../../lib/controller');
const companyFacade = require('./facade');

class CompanyController extends Controller {

  registerCompany(req, res, next) {
    const { companyName, ...companyAdmin } = req.body;
<<<<<<< HEAD
=======
    console.log(req.body);
>>>>>>> commit before update
    if (!companyName || !companyAdmin) return res.status(400).json({ error: true, message: 'Missing company details' }); // todo should probably be an error type instead?
    if (!companyAdmin.email || !companyAdmin.password) return res.status(400).json({ error: true, message: 'Missing company rep details' });

    const user = {
      firstName: companyAdmin.firstName,
      lastName: companyAdmin.lastName,
      email: companyAdmin.email,
      role: 'COMPANY_ADMIN',
      password: companyAdmin.password
    };

    const company = {
      companyName
    };

    const AlreadyExistPromises = [
      companyFacade.userSchema().find({ email: user.email }),
      companyFacade.find({ companyName: company.companyName })
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
    
    //Create companyAdmin Object
    const companyAdmin = (({ firstName, lastName, email }) => ({ firstName, lastName, email }))(req.body);
    companyAdmin.role = "COMPANY_ADMIN";
    console.log(companyAdmin);
    
    //Get the company admin who created the user
    const decodedToken = jwt.verify(req.headers.authorization, jwtSecret);
    console.log(decodedToken);

    const mongoUserQuery = {'email': 'company_admin@admin.nu'};
    companyFacade.userSchema().findOne(mongoUserQuery).then((docs)=> {
      companyFacade.find({'admin': docs._id}).then((docs)=> {return res.status(201).json({ error: false })})
    });

  }

}

module.exports = new CompanyController(companyFacade);
