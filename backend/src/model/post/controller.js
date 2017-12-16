const Controller = require('../../lib/controller');
const postFacade = require('./facade');

class postController extends Controller {}

module.exports = new PostController(postFacade);
