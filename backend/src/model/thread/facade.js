const Facade = require('../../lib/facade');
const threadSchema = require('./schema');

class ThreadFacade extends Facade {

  find(...args) {
    return threadSchema
      .find(...args)
      .populate('category')
      .populate('creator')
      .exec();
  }

  findOne(...args) {
    return threadSchema
      .findOne(...args)
      .populate('category')
      .populate('creator')
      .exec();
  }
}

module.exports = new ThreadFacade(threadSchema);
