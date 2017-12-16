const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');
const companyGroup = require("../../lib/roles").companyGroup;


router.route('/')
  .get((...args) => controller.find(...args));

router.route('/:id')
  .put(checkRole.checkRoles(companyGroup), (...args) => controller.update(...args))
  .get((...args) => controller.getMaterial(...args)) // getMaterial -> findById
  .delete(checkRole.checkRoles(companyGroup),(...args) => controller.remove(...args));


router.route('/:id/annotation')
  .post((...args) => controller.addAnnotation(...args));

module.exports = router;
