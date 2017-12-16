const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/:categoryid')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

module.exports = router;
