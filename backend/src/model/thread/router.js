const controller = require('./controller')
const Router = require('express').Router
const router = new Router()

router.route('/thread')
    .get((...args) => controller.find(...args))
    // .get((...args) => controller.getAllThreads(...args))
    .post((...args) => controller.createThread(...args))

router.route('/thread/user')
    .get((...args) => controller.findForUser(...args))

router.route('/search')
    .get((...args) => controller.search(...args));

router.route('/thread/:id')
    .put((...args) => controller.update(...args))
    .get((...args) => controller.getThreadWithPosts(...args))
    .delete((...args) => controller.remove(...args))

router.route('/thread/:id/post')
    .post((...args) => controller.createAnswer(...args))

module.exports = router
