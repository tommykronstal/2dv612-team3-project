const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/notifications/:id')
  .get((...args) => controller.findForUser(...args));

router.route('/:id')
  .post((...args) => controller.removeForUser(...args));

module.exports = router;
