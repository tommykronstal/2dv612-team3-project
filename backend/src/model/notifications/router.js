const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

/**
 * Used for testing, remove when everything is done and works
 */
router.route('/')
  .get((...args) => controller.find(...args));


router.route('/:id')
  .get((...args) => controller.findForUser(...args))
  .post((...args) => controller.removeForUser(...args));

module.exports = router;
