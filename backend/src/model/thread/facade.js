const Facade = require('../../lib/facade');
const threadSchema = require('./schema');

class ThreadFacade extends Facade {}

module.exports = new ThreadFacade(threadSchema);
