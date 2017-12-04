const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/:materialid')
  .get((...args) => controller.findForMaterial(...args))
  .post((...args) => controller.create(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findForMaterial(...args))
  .delete((...args) => controller.remove(...args));

module.exports = router;
