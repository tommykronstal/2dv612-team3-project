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

  findById(...args) {
    return this.Schema
      .findById(...args)
      .populate('products')
      .exec();
  }

  getCompanyID(doc) {
    return new Promise((resolve, reject) => {
      let query = doc.role === "COMPANY_ADMIN" ? { admin: doc._id } : { reps: doc._id };
      this.findOne(query).then((doc) => {
        if (doc === null) reject({error: true, message: `could not find a company for user`});
        resolve(doc._id);
      }).catch(e => {
        reject({ error: true, message: 'error finding company for user'})
      })

    })

  }
}

module.exports = new CompanyFacade(companySchema);
