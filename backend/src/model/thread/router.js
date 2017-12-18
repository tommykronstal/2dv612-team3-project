const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
    .get((...args) => controller.getAllThreads(...args));

router.route('/:id')
    .post((...args) => controller.createThread(...args))
    .get((...args) => controller.findById(...args))
    .delete((...args) => controller.remove(...args));


router.route('/thread/:id')
    .put((...args) => controller.updateThread(...args));

module.exports = router;
