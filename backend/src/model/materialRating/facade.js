const Facade = require('../../lib/facade');
const newModelSchema = require('./schema');

class NewModelFacade extends Facade {}

module.exports = new NewModelFacade('NewModel', newModelSchema);
