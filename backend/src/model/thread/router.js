const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();


router.route('/')
.get((...args) => controller.findAll(...args));


router.route('/:categoryid')
  .get((...args) => controller.findForCategory(...args))
  .post((...args) => controller.createForCategory(...args));

module.exports = router;
