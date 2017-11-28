const Controller = require('../../lib/controller');
const materialFacade = require('./facade');

class MaterialController extends Controller {}

module.exports = new MaterialController(materialFacade);
