const Facade = require('../../lib/facade');
const threadSchema = require('./schema');

class threadFacade extends Facade {}

module.exports = new threadFacade(threadSchema);
