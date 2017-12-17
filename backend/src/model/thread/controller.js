const Controller = require('../../lib/controller');
const threadFacade = require('./facade');
const categoryFacade = require("../category/facade");

class threadController extends Controller {

    async findAll(req, res, next) {

    }


    async findForCategory(req, res, next) {
        categoryFacade.findById(req.param("categoryid")).then(doc => {
            res.status(200).json(doc.thread);
        })
        .catch((e) => {return next({message: 'Could not find category.', statusCode: 400})});
    }


    async createForCategory(req, res, next) {

    }


    async findForUser(req, res, next) {

    }
}

module.exports = new threadController(threadFacade);