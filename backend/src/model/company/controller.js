const Controller = require('../../lib/controller');
const companyFacade = require('./facade');

class CompanyController extends Controller {

  registerCompany(req, res, next) {
    const { companyName, companyAdmin } = req.body;
    if (!(companyName || companyAdmin)) return res.status(400).json({ error: true, msg: 'Missing company details' }); // todo should probably be an error type instead?
    if (!(companyAdmin.email || companyAdmin.password)) return res.status(400).json({ error: true, msg: 'Missing company rep details' });

    const promises = [
      companyFacade.userSchema().findOneAndUpdate({ 'email': companyAdmin.email }, { $set: { 'email': companyAdmin.email } }, { upsert: true }),
      companyFacade.create(companyName)
    ];

    Promise.all(promises).then((user, company) => {
      if (!user._id) return res.status(400).json({ error: true, msg: 'error creating or updating user' });



      if (user.password) { // it's an existing user being made company admin, no need to update the password.

      } else { // new user created same time as company

      }

    }).catch((error) => {

    })

  }

}

module.exports = new CompanyController(companyFacade);
