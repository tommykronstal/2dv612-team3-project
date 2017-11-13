const Facade = require('../../lib/facade');
const companyRepSchema = require('./schema');

class CompanyRepFacade extends Facade {}

module.exports = new CompanyRepFacade(companyRepSchema);
