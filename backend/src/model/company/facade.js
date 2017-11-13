const Facade = require('../../lib/facade');
const companySchema = require('./schema');

class UserFacade extends Facade {}

module.exports = new UserFacade(companySchema);
