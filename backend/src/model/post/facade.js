const Facade = require('../../lib/facade');
const postSchema = require('./schema');

class PostFacade extends Facade {}

module.exports = new PostFacade('Post', postSchema);
