const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

router.route('/login')
  .post((...args) => controller.login(...args));

router.route('/register')
  .post((...args) => controller.register(...args));

router.route('/register/consumer')
  .post((...args) => controller.registerConsumer(...args))

module.exports = router;
