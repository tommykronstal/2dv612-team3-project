const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args));

router.route('/:id')
  .put((...args) => controller.createMaterial(...args))
  .get((...args) => controller.getMaterial(...args)) // getMaterial -> findById
  .delete((...args) => controller.remove(...args));

/* These features are perormed directly towards material... For now...
router.route('/:id/annotation')
  .post((...args) => controller.createAnnotation(...args))
  .put((...args) => controller.update(...args))
  .get((...args) => controller.getById(...args))
  .delete((...args) => controller.remove(...args));
*/

module.exports = router;
