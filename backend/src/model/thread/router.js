const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/thread')
    .get((...args) => controller.getAllThreads(...args))
    .post((...args) => controller.createThread(...args))


router.route('/thread/user')
    .get((...args) => controller.findForUser(...args))


router.route('/thread/:id')
    .put((...args) => controller.updateThread(...args))
    .get((...args) => controller.findById(...args))
    .delete((...args) => controller.remove(...args));

module.exports = router;
