const Facade = require('../../lib/facade')
const productSchema = require('./schema')

class ProductFacade extends Facade {
  findById (...args) {
    return productSchema
          .findById(...args)
          .populate({
            path: 'materials',
            populate: {
              path: 'rating'
            }
          })
          .populate('category')
          .exec()
  }

  findForSearch (...args) {
    return productSchema
    .find(...args)
    .populate({
      path: 'materials',
      populate: {
        path: 'rating'
      }
    })
    .populate('category')
    .exec()
  }
}

module.exports = new ProductFacade(productSchema)
