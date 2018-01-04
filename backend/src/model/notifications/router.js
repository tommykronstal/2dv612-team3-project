const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

/**
 * Used for testing, remove when everything is done and works
 */
router.route('/')
  .get((...args) => controller.findForUser(...args));

router.route('/:id')  
  .delete((...args) => controller.removeForUser(...args));

module.exports = router;
