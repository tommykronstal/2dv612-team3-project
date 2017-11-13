const Controller = require('../../lib/controller');
const companyFacade = require('./facade');

class UserController extends Controller {}

module.exports = new UserController(companyFacade);
