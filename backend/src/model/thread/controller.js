const Controller = require('../../lib/controller');
const ThreadFacade = require('./facade');

class threadController extends Controller {}

module.exports = new threadController(ThreadFacade);