const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/company/:companyid/product')
  .get((...args) => controller.findForCompany(...args))
  .post((...args) => controller.create(...args));

router.route('/product')
    .get((...args) => controller.find(...args))
    //.post((...args) => controller.create(...args));

router.route('/company/:companyid/product/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

module.exports = router;