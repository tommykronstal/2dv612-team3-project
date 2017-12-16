const Controller = require('../../lib/controller');
const threadFacade = require('./facade');

class threadController extends Controller {}

module.exports = new threadController(threadFacade);