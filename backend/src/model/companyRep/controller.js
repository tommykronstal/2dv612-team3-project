const Controller = require('../../lib/controller');
const companyRepFacade = require('./facade');

class CompanyRepController extends Controller {}

module.exports = new CompanyRepController(companyRepFacade);
