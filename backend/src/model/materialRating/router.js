const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/:materialid/rating')
  .get((...args) => controller.findForMaterial(...args))
  .post((...args) => controller.createRating(...args));

module.exports = router;
