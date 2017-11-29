const Facade = require('../../lib/facade');
const materialSchema = require('./schema');

class MaterialFacade extends Facade {}

module.exports = new MaterialFacade(materialSchema);
