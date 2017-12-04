const Facade = require('../../lib/facade');
const productSchema = require('./schema');

class ProductFacade extends Facade {

    findById(...args) {
        return productSchema
          .findById(...args)
          .populate('materials')
          .exec();
      }
}

module.exports = new ProductFacade(productSchema);
