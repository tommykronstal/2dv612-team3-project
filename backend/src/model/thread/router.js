const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();


router.route('/')
.get((...args) => controller.findAll(...args));


router.route('/:categoryid')
  .get((...args) => controller.findForCategory(...args))
  .post((...args) => controller.createForCategory(...args));

router.route('/:userid')
  .get((...args) => controller.findForUser(...args));

  
module.exports = router;
