const Controller = require('../../lib/controller');
const companyFacade = require('./facade');
const crypto = require('crypto');
const salt = 'jod';

class CompanyController extends Controller {

  registerCompany(req, res, next) {
    const { companyName, companyAdmin } = req.body;
    if (!(companyName || companyAdmin)) return res.status(400).json({ error: true, msg: 'Missing company details' }); // todo should probably be an error type instead?
    if (!(companyAdmin.email || companyAdmin.password)) return res.status(400).json({ error: true, msg: 'Missing company rep details' });
    

    let user = {
      firstName: companyAdmin.firstName,
      lastName: companyAdmin.lastName,
      email: companyAdmin.email,
      role: 'COMPANY_ADMIN',
      password: companyAdmin.password
    };

    let company = {
      companyName: companyName
    };
    
    // const promises = [
    //   companyFacade.userSchema().find({'email': user.email}),
    //   companyFacade.find({'companyName': company.companyName})
    // ];

    //Promise.all(promises).then((userAndCompany) => {
    companyFacade.find({'companyName': company.companyName})
    .then((docs) => {
      return docs
    }).then((docs)=>{
      if(docs.length === 0){
        companyFacade.userSchema().create(user)
        .then((userDoc) =>{
          company.admin = userDoc.id
          userDoc.save();
          companyFacade.create(company)
          .then((companyDoc) => {
            companyDoc.save()
            return res.status(200).json({ error: false })
          })
        })
      }
      else {
        return res.status(400).json({ error: true, msg: 'Company already exists'})
      }
    }).catch(err => next(err));       
  }
}

module.exports = new CompanyController(companyFacade);

