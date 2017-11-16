const Controller = require('../../lib/controller');
const companyFacade = require('./facade');
const crypto = require('crypto');
const salt = 'jod';


class CompanyController extends Controller {

  registerCompany(req, res, next) {
    const { companyName, companyAdmin } = req.body;
    if (!(companyName || companyAdmin)) return res.status(400).json({ error: true, msg: 'Missing company details' }); // todo should probably be an error type instead?
    if (!(companyAdmin.email || companyAdmin.password)) return res.status(400).json({ error: true, msg: 'Missing company rep details' });

    const promises = [ // may need to call .exec() in order to get promise from mongooose??
      companyFacade.userSchema().findOneAndUpdate({ 'email': companyAdmin.email }, { $set: { 'email': companyAdmin.email } }, { upsert: true }),
      companyFacade.create(companyName)
    ];

    Promise.all(promises).then((userAndCompany) => {
      if (userAndCompany[0][0]) return res.status(400).json({ error: true, msg: 'error from mongo for user query' });
      if (userAndCompany[1][0]) return res.status(400).json({ error: true, msg: 'error from mongo for company query' });
      const user = userAndCompany[0][1];
      const company = userAndCompany[1][1];
      if (!user._id) return res.status(400).json({ error: true, msg: 'error creating or updating user' });
      if (!company._id) return res.status(400).json({ error: true, msg: 'error creating or updating company' }); // todo this will be prettier i promise
      user.role = 'COMPANY_ADMIN';
      company.admin = user._id;

      if (!user.password) { // it's an existing user being made company admin, no need to update the password.
        // todo move to a onSave method in user schema to keep things DRY as same thing is now on user register route
        user.password = `${companyAdmin.password}${salt}`;
        user.password = crypto.createHash('sha256').update(user.password).digest('hex');
      }
      Promise.all([user.save(), company.save()]).then(() => {
        return res.status(200).json({ error: false }); // todo what do we want to return?
      }).catch((error) => {
        return res.status(400).json({ error: true, msg: 'couldnt save company or user' });
      });
    }).catch((error) => {
      console.error(error);
      return res.status(400).json({ error: true, msg: 'somethhing went wrong' });
    });

  }

}

module.exports = new CompanyController(companyFacade);
