const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.getMaterial(...args)) // getMaterial -> findById
  .delete((...args) => controller.remove(...args));


router.route('/:id/annotation')
  .post((...args) => controller.addAnnotation(...args))
  .put((...args) => controller.update(...args))
  .get((...args) => controller.getById(...args))
  .delete((...args) => controller.remove(...args));

module.exports = router;
