const Controller = require('../../lib/controller');
const productFacade = require('./facade');

class ProductController extends Controller {}

module.exports = new ProductController(productFacade);
