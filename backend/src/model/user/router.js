const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');
const admin = require("../../lib/roles").admin;

router.route('/')
  .get(checkRole.checkRoles(admin), (...args) => controller.find(...args))
  .post(checkRole.checkRoles(admin),(...args) => controller.create(...args));

router.route('/:id')
  .put(checkRole.checkRoles(admin),(...args) => controller.update(...args))
  .get(checkRole.checkRoles(admin),(...args) => controller.findById(...args))
  .delete(checkRole.checkRoles(admin),(...args) => controller.remove(...args));

router.route('/login')
  .post((...args) => controller.login(...args));

router.route('/register')
  .post((...args) => controller.register(...args));

module.exports = router;
