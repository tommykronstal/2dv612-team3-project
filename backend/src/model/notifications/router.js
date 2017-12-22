const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/:id')
  .get((...args) => controller.findForUser(...args))
  .post((...args) => controller.removeForUser(...args));

module.exports = router;
