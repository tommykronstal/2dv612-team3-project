const Facade = require('../../lib/facade');
const companySchema = require('./schema');
const userSchema = require('../user/schema');

class CompanyFacade extends Facade {

  userSchema() {
    return userSchema;
  }

  find(...args) {
    return companySchema
      .find(...args)
      .populate('admin', {password: 0, '__v': 0})
      .exec();
  }
}

module.exports = new CompanyFacade(companySchema);
