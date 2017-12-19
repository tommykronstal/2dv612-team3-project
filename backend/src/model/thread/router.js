const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/thread')
    .get((...args) => controller.getAllThreads(...args))
    .post((...args) => controller.createThread(...args))

router.route('/thread/:id')    
    .put((...args) => controller.update(...args))
    .post((...args) => controller.createAnswer(...args))
    .get((...args) => controller.findById(...args))
    .delete((...args) => controller.remove(...args));


module.exports = router;
