const Facade = require('../../lib/facade');
const materialRatingSchema = require('./schema');

class materialRatingFacade extends Facade {}

module.exports = new materialRatingFacade(materialRatingSchema);
