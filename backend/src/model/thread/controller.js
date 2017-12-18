const Controller = require('../../lib/controller');
const ThreadFacade = require('./facade');

class ThreadController extends Controller {}

module.exports = new ThreadController(ThreadFacade);