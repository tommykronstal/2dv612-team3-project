const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

router.route('/register')
  .post((...args) => controller.registerCompany(...args));

router.route('/rep/register')
  .post((...args) => controller.registerCompanyRep(...args));  

module.exports = router;
