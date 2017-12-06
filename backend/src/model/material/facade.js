const Facade = require('../../lib/facade');
const materialSchema = require('./schema');

class MaterialFacade extends Facade {
    findById(...args) {
        return this.Schema
          .findById(...args)
          .populate('rating', { '__v': 0 })
          .exec();
      }
}

module.exports = new MaterialFacade(materialSchema);
