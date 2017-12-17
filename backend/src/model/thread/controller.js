const Controller = require('../../lib/controller');
const threadFacade = require('./facade');

class threadController extends Controller {

    async findAll(req, res, next) {
        
    }


    async findForCategory(req, res, next) {

    }


    async createForCategory(req, res, next) {

    }

}

module.exports = new threadController(threadFacade);