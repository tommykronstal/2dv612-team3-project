const Controller = require('../../lib/controller');
const threadFacade = require('./facade');

class ThreadController extends Controller {
  async getAllThreads (req, res, next) {
    try {
      let threads = await threadFacade.find();
      if (threads) {
        let doc = {
          title: threads.title,
          date: threads.date,
          category: threads.category,
          user: threads.creater
        }
        return res.status(200).json(doc);
      }
    } catch (e) {
      return next({message: 'Could not find threads.', statusCode: 400})
    }
  }
}

module.exports = new ThreadController(threadFacade);